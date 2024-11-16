import { Button } from '@/shared/components';
import { Box } from '@mui/material';

export const AdminPage = () => {
	return (
		<div>
			<h1>This is Admin page</h1>
			<Box display='flex' gap='12px' alignItems='center'>
				<Button label='just button' view='primary' />
				<Button label='just button' view='outlined-on-dark' />
				<Button label='just button' view='secondary' />
				<Button label='just button' view='transparent' />
				<Button label='just button' view='link' />
			</Box>
			<Box
				display='flex'
				gap='12px'
				alignItems='center'
				sx={{ background: 'var(--white-color)' }}>
				<Button label='just button' view='primary' />
				<Button label='just button' view='outlined-on-light' />
				<Button label='just button' view='secondary' />
				<Button label='just button' view='transparent' />
				<Button label='just button' view='link' />
			</Box>
		</div>
	);
};
