import searchAdmins from '@/features/user/api/queries/searchAdmins';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
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
	const [searchResults, setSearchResults] = useState<IAdminSearch[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isInitialLoad, setIsInitialLoad] = useState(true);

	const getAdminById = async (id: string) => {
		try {
			const result = await searchAdmins({
				searchValue: id,
				searchField: 'id',
			});
			return result[0];
		} catch (error) {
			console.error(`Error fetching admin with ID ${id}:`, error);
			return null;
		}
	};

	// Загрузка начальных данных
	const loadInitialData = useCallback(async () => {
		const adminsToLoad = selectedAdmins.filter((admin) => !admin.email);
		if (adminsToLoad.length === 0 || !isInitialLoad) return;

		setIsLoading(true);
		try {
			const loadedAdmins = await Promise.all(
				adminsToLoad.map((admin) => getAdminById(admin.id))
			);

			const validLoadedAdmins = loadedAdmins.filter(Boolean) as IAdminSearch[];

			if (validLoadedAdmins.length > 0) {
				const updatedAdmins = selectedAdmins.map(
					(admin) =>
						validLoadedAdmins.find((loaded) => loaded.id === admin.id) || admin
				);
				onSelectedAdmins(updatedAdmins);
			}
		} catch (error) {
			console.error('Error loading initial admin data:', error);
		} finally {
			setIsLoading(false);
			setIsInitialLoad(false);
		}
	}, [selectedAdmins, onSelectedAdmins, isInitialLoad]);

	useEffect(() => {
		loadInitialData();
	}, [loadInitialData]);

	// Поиск админов
	const searchAdminUsers = async (searchValue: string) => {
		if (searchValue.length < 2) {
			setSearchResults([]);
			return;
		}

		setIsLoading(true);
		try {
			const foundAdmins = await searchAdmins({
				searchValue: searchValue,
				searchField: 'email',
			});
			const filteredAdmins = foundAdmins.filter(
				(admin) => !selectedAdmins.some((selected) => selected.id === admin.id)
			);
			setSearchResults(filteredAdmins);
		} catch (error) {
			console.error('Error searching admins:', error);
			setSearchResults([]);
		} finally {
			setIsLoading(false);
		}
	};

	const debouncedSearch = useCallback(
		debounce((term: string) => {
			if (term.length >= 2) {
				searchAdminUsers(term);
			}
		}, 300),
		[]
	);

	useEffect(() => {
		if (searchTerm) {
			debouncedSearch(searchTerm);
		} else {
			setSearchResults([]);
		}
		return () => debouncedSearch.cancel();
	}, [searchTerm]);

	const getOptionLabel = (option: IAdminSearch): string => {
		if (!option.email) {
			return 'Загрузка...';
		}
		return `${option.email} (${option.firstName} ${option.lastName})`;
	};

	const handleInputChange = (_: any, newValue: string) => {
		setSearchTerm(newValue);
	};

	const handleChange = (_: any, value: IAdminSearch[]) => {
		onSelectedAdmins(value);
	};

	return (
		<Autocomplete
			multiple
			options={searchResults}
			value={selectedAdmins}
			loading={isLoading}
			onChange={handleChange}
			onInputChange={handleInputChange}
			getOptionLabel={getOptionLabel}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			renderInput={(params) => (
				<TextField
					{...params}
					label='Соавторы'
					helperText='Введите минимум 2 символа для поиска'
				/>
			)}
			sx={autocompleteStyles}
		/>
	);
};
