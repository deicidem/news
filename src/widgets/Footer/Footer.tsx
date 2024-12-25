import { Box, Container, Typography } from '@mui/material';
import './footerStyled.scss';

export const Footer = () => {
	return (
		<Box
			component='footer'
			sx={{
				height: 'fit-content',
				backgroundColor: 'var(--main-color)',
				py: 6,
			}}>
			<Container>
				<Box display='flex' justifyContent='space-between' width='100%'>
					<Box className='textBlockFooter'>
						<Typography variant='h6' gutterBottom>
							О нас
						</Typography>
						<Typography variant='body2'>
							EventConf - платформа для организации и участия в конференциях и
							мероприятиях в сфере технологий и инноваций.
						</Typography>
					</Box>
					<Box className='textBlockFooter'>
						<Typography variant='h6' gutterBottom>
							Контакты
						</Typography>
						<Typography variant='body2'>
							Email: support@eventconf.com
						</Typography>
						<Typography variant='body2'>Телефон: +7 (999) 123-45-67</Typography>
					</Box>
				</Box>
				<Box mt={4} textAlign='center'>
					<Typography variant='body2'>
						© {new Date().getFullYear()} EventConf. Все права защищены.
					</Typography>
				</Box>
			</Container>
		</Box>
	);
};
