import { Box } from '@mui/material';
import './footerStyled.scss';

export const Footer = () => {
	return (
		<Box
			component='footer'
			sx={{
				height: 'fit-content',
				backgroundColor: 'var(--main-color)',
			}}>
			<div className='footer-wrapper'>This is footer</div>
		</Box>
	);
};
