// Надо явно указать, что это клиентский компонент, т.к. next думает, что это серверный компонент
'use client';
import { Box } from '@mui/material';
import { Button } from '@/shared/components';
import { useParams, useRouter } from 'next/navigation';

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

	const id = params?.id;

	return (
		<Box>
			<Box>gdgrd</Box>
			<Button label='назад' view='primary' onClick={() => router.back()} />
			<p>This is detail event page ID: {id}</p>
		</Box>
	);
};
