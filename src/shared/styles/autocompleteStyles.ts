export const autocompleteStyles = {
	'.MuiFormHelperText-root': {
		color: 'var(--text-secondary)',
	},
	'& .MuiSvgIcon-root': {
		color: 'var(--white-color)',
	},
	'.MuiAutocomplete-root': {
		'& input': {
			color: 'var(--white-color)',
		},
		'.MuiOutlinedInput-root': {
			background: 'var(--background-gray)',
			color: 'var(--white-color)',
			borderRadius: '12px',

			'& .MuiOutlinedInput-notchedOutline': {
				borderColor: 'var(--custom-gray)',
			},
			'&:hover .MuiOutlinedInput-notchedOutline': {
				borderColor: 'var(--white-color)',
			},
			'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
				borderColor: 'var(--white-color)',
			},
		},
		'.MuiInputLabel-root': {
			color: 'var(--text-secondary)',
			'&.Mui-focused': {
				color: 'var(--white-color)',
			},
		},
		'.MuiAutocomplete-clearIndicator': {
			color: 'var(--white-color)',
			'&:hover': {
				opacity: 1,
				backgroundColor: 'var(--background-light-gray)',
			},
		},
		'&:hover': {},
		'.MuiAutocomplete-popupIndicator': {
			color: 'var(--white-color)',
			'&:hover': {
				backgroundColor: 'var(--background-light-gray)',
			},
		},
	},
	'.MuiAutocomplete-popper': {
		'& .MuiPaper-root': {
			backgroundColor: 'var(--background-light-gray)',
			color: 'var(--white-color)',
			border: '1px solid var(--custom-gray)',

			'& .MuiAutocomplete-listbox': {
				padding: '8px 0',
				'::-webkit-scrollbar': {
					width: '8px',
				},
				'::-webkit-scrollbar-track': {
					background: 'var(--background-light-gray)',
				},
				'::-webkit-scrollbar-thumb': {
					background: 'var(--accent-color)',
					borderRadius: '4px',
				},
				'& .MuiAutocomplete-option': {
					padding: '8px 16px',
					minHeight: '48px',
					display: 'flex',
					alignItems: 'center',
					cursor: 'pointer',

					'&[aria-selected="true"]': {
						backgroundColor: 'var(--accent-color)',
					},
					'&.Mui-focused': {
						backgroundColor: 'var(--accent-color-secondary)',
					},
					'&:hover': {
						backgroundColor: 'var(--accent-color-secondary)',
					},
				},
				'& .MuiAutocomplete-groupLabel': {
					color: 'var(--text-secondary)',
					backgroundColor: 'var(--background-light-gray)',
				},
			},
			'& .MuiAutocomplete-noOptions': {
				color: 'var(--text-secondary)',
				padding: '16px',
			},
		},
	},
	'.MuiCheckbox-root': {
		color: 'var(--white-color)',
		'&.Mui-checked': {
			color: 'var(--accent-color)',
		},
	},
	'.MuiAutocomplete-tag': {
		backgroundColor: 'var(--accent-color)',
		color: 'var(--white-color)',
		'& .MuiChip-deleteIcon': {
			color: 'var(--text-outline)',
			'&:hover': {
				color: 'var(--white-color)',
			},
		},
	},
};
