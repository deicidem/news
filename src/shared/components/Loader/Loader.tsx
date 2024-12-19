import { Box, CircularProgress } from '@mui/material';

type LoaderProps = {
	visible?: boolean;
};

export const Loader = ({ visible = false }: LoaderProps) => {
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
				opacity: visible ? 1 : 0,
				visibility: visible ? 'visible' : 'hidden',
				transition: 'opacity 0.3s ease, visibility 0.3s ease',
			}}>
			<CircularProgress sx={{ color: 'var(--accent-color)' }} size={60} />
		</Box>
	);
};
