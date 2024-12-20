'use client';
import { Box } from '@mui/material';
import { Button, HeaderText, Loader } from '@/shared/components';
import { useRouter } from 'next/navigation';
import { withAdminAuthHOC } from '@/shared/HOCS';
import { CardEvent } from '@/widgets';
import { useQuery } from '@blitzjs/rpc';
import { Suspense } from 'react';
import getAdminEvents from '@/features/events/api/queries/getAdminEvents';
import s from './styled.module.scss';

const AdminEventsList = () => {
	const router = useRouter();
	const [events] = useQuery(getAdminEvents, null);

	return (
		<Box className={s.wrapper}>
			<Box className={s.header}>
				<HeaderText text='Мои события' size='h1' />
				<Button
					label='Создать событие'
					view='primary'
					onClick={() => router.push('/admin/managerEvents/create')}
				/>
			</Box>
			<Suspense fallback={<Loader visible={true} />}>
				<Box className={s.eventsList}>
					{events?.map((event) => (
						<CardEvent key={event.id} event={event} />
					))}
				</Box>
			</Suspense>
		</Box>
	);
};

export default withAdminAuthHOC(AdminEventsList);
