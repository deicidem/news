import { Box, CircularProgress } from '@mui/material';

export const Loader = () => {
	return (
		<Box
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				background: 'rgba(0, 0, 0, 0.7)',
				zIndex: 9999,
			}}>
			<CircularProgress sx={{ color: 'var(--accent-color)' }} size={60} />
		</Box>
	);
};
