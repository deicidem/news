// Надо явно указать, что это клиентский компонент, т.к. next думает, что это серверный компонент
'use client';
import { Box } from '@mui/material';
import { Button } from '@/shared/components';
import { useParams, useRouter } from 'next/navigation';
import { EventDetail } from '@/widgets/EventDetail';
import s from './pageStyled.module.scss';
import { eventsMocks } from '@/shared/api/mocks';
import { EventHeaderDetail } from '@/features/eventHeaderDetail';
import { findEventById } from '@/widgets/EventDetail/EventDetail';

type ConferencePageProps = {
	id: string;
};
// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const { id } = context.params!;
//
// 	if (!id) {
// 		return {
// 			notFound: true,
// 		};
// 	}
//
// 	return {
// 		props: {
// 			id: id as string,
// 		},
// 	};
// };

export const EventDetailPage = () => {
	const router = useRouter();
	const params = useParams();

	const id = params?.id as string;
	const event = findEventById(eventsMocks, id);
	console.log(id);

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
