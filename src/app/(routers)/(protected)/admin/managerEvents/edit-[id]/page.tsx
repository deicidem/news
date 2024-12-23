'use client';
import { Box } from '@mui/material';
import { EventForm } from '@/widgets/EventForm/EventForm';
import { withAdminAuthHOC } from '@/shared/HOCS';

const EditEventPage = () => {
	return (
		<Box>
			<EventForm />
		</Box>
	);
};

export default withAdminAuthHOC(EditEventPage);
