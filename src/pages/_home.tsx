import { Box } from '@mui/material';
import { Button } from '@/shared/components';

export default function _home() {
	return (
		<Box>
			<Box
				position='absolute'
				height='82vh'
				width='100%'
				top='78px'
				left='0'
				sx={{
					// backgroundImage:
					// 	"url('https://i.pinimg.com/originals/26/94/0d/26940d1bdb5e82a5d32845f31a0ade1f.gif')",
					backgroundSize: 'fit-content',
					filter: 'blur(5px)',
				}}
			/>
			<Box
				position='absolute'
				zIndex='100'
				top='30%'
				left='45%'
				display='flex'
				flexDirection='column'
				alignItems='center'
				gap='24px'>
				<h1>Добро пожаловать!</h1>
				<Box>
					<Button label='Предстоящие события' view='primary' href='/events' />
				</Box>
			</Box>
		</Box>
	);
}
