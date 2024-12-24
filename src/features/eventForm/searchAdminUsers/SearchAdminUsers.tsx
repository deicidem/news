import searchAdmins from '@/features/user/api/queries/searchAdmins';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { autocompleteStyles } from '@/shared/styles';

type TSearchAdminUsersProps = {
	selectedAdmins: IAdminSearch[];
	onSelectedAdmins: (value: IAdminSearch[]) => void;
};
export const SearchAdminUsers = ({
	selectedAdmins,
	onSelectedAdmins,
}: TSearchAdminUsersProps) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [admins, setAdmins] = useState<IAdminSearch[]>([]);

	const searchAdminUsers = async (email: string) => {
		if (email.length >= 2) {
			const foundAdmins = await searchAdmins(email);
			const filteredAdmins = foundAdmins.filter(
				(admin) => !selectedAdmins.some((selected) => selected.id === admin.id)
			);
			setAdmins(filteredAdmins);
		} else {
			setAdmins([]);
		}
	};

	const debouncedSearch = debounce(searchAdminUsers, 300);

	useEffect(() => {
		debouncedSearch(searchTerm);
		return () => {
			debouncedSearch.cancel();
		};
	}, [searchTerm]);

	const handleAdminChange = (_, value: IAdminSearch[]) => {
		const uniqueAdmins = Array.from(
			new Map(value.map((admin) => [admin.id, admin])).values()
		);
		onSelectedAdmins(uniqueAdmins);
	};

	return (
		<>
			<Autocomplete
				multiple
				options={admins}
				value={selectedAdmins}
				onChange={handleAdminChange}
				getOptionLabel={(option) =>
					`${option.email} (${option.firstName} ${option.lastName})`
				}
				renderInput={(params) => (
					<TextField
						{...params}
						label='Соавторы'
						onChange={(e) => setSearchTerm(e.target.value)}
						helperText='Введите минимум 2 символа для поиска'
					/>
				)}
				sx={autocompleteStyles}
			/>
		</>
	);
};
