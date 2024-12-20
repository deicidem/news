export const sxStyles = {
	'& .MuiInputBase-root': {
		background: 'var(--background-gray)',
		color: 'var(--white-color)',
		borderRadius: '12px',
		'svg path': {
			color: 'var(--white-color)',
		},
	},
	'& .MuiInputLabel-root': {
		color: 'var(--text-secondary)',
		'&.Mui-focused': {
			color: 'var(--white-color)',
		},
	},
	'& .MuiOutlinedInput-notchedOutline': {
		borderColor: 'var(--custom-gray)',
	},
	'& .Mui-focused .MuiOutlinedInput-notchedOutline': {
		borderColor: 'var(--white-color)',
	},
};
