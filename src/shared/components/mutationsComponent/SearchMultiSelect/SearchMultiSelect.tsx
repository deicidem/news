import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { debounce } from 'lodash';
import { autocompleteStyles } from '@/shared/styles';

type Option = {
	id: string;
	title?: string;
	email?: string;
	firstName?: string;
	lastName?: string;
};

type TSearchMultiSelectProps = {
	selectedOptions: Option[];
	onSelectedOptionsChange: (value: Option[]) => void;
	searchFunction: (searchTerm: string) => Promise<Option[]>;
	label: string;
	getOptionLabel: (option: Option) => string;
	limitOptions?: number;
	initialOptions?: Option[];
};

export const SearchMultiSelect = ({
	selectedOptions,
	onSelectedOptionsChange,
	searchFunction,
	label,
	getOptionLabel,
	limitOptions,
	initialOptions = [],
}: TSearchMultiSelectProps) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [options, setOptions] = useState<Option[]>(initialOptions);

	useEffect(() => {
		if (initialOptions.length > 0) {
			setOptions(initialOptions);
		}
	}, [initialOptions]);

	const debouncedSearch = debounce(async (term: string) => {
		if (term.length >= 2 || !limitOptions) {
			const results = await searchFunction(term);
			setOptions(limitOptions ? results.slice(0, limitOptions) : results);
		} else {
			setOptions(initialOptions);
		}
	}, 300);

	useEffect(() => {
		debouncedSearch(searchTerm);
		return () => {
			debouncedSearch.cancel();
		};
	}, [searchTerm]);

	const handleChange = (_, value: Option[]) => {
		const uniqueOptions = Array.from(
			new Map(value.map((option) => [option.id, option])).values()
		);
		onSelectedOptionsChange(uniqueOptions);
	};

	return (
		<Autocomplete
			multiple
			options={options}
			value={selectedOptions}
			onChange={handleChange}
			getOptionLabel={getOptionLabel}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					onChange={(e) => setSearchTerm(e.target.value)}
					helperText={
						limitOptions ? 'Введите минимум 2 символа для поиска' : undefined
					}
				/>
			)}
			sx={autocompleteStyles}
		/>
	);
};
