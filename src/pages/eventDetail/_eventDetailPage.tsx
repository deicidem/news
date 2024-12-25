'use client';
import { Box } from '@mui/material';
import { Button } from '@/shared/components';
import { useParams, useRouter } from 'next/navigation';
import { EventDetail } from '@/widgets/EventDetail';
import s from './pageStyled.module.scss';
import { eventsMocks } from '@/shared/api/mocks';
import { EventHeaderDetail } from '@/widgets/EventDetail/components/EventHeaderDetail';
import { findEventById } from '@/widgets/EventDetail/EventDetail';

export const EventDetailPage = () => {
	const router = useRouter();
	const params = useParams();

	const id = params?.id as string;
	const event = findEventById(eventsMocks, id);

	return (
		<Box className={s.wrapper}>
			<EventHeaderDetail
				event={event || eventsMocks[0]}
				btnBack={
					<Button
						label='назад'
						view='primary'
						onClick={() => router.back()}
						addedClassName={s.btnBack}
					/>
				}
			/>
			<EventDetail idEvent={id || '1'} />
		</Box>
	);
};
