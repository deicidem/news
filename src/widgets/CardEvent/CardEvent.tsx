'use client';
import s from './cardEventStyled.module.scss';
import { BodyText, HeaderText } from '@/shared/components';
import { Box } from '@mui/material';
import Link from 'next/link';
import { formatDateToString } from '@/shared/utils';
import { EditEventBtn } from '@/widgets/CardEvent/components/editEventBtn';

type TCardEventProps = {
	event: any;

	onDelete?: () => void;
};
export const CardEvent = ({ event, onDelete }: TCardEventProps) => {
	return (
		<Link href={`/events/${event.id}`} className={s.link}>
			<Box className={s.cardWrapper}>
				<Box className={s.cardWrapper_imgBox}>
					<Box className={s.cardWrapper_imgBox_dates}>
						<BodyText
							text={`${formatDateToString(event.startDate)}`}
							size='p1'
							fontWeight='600'
						/>
						<BodyText text={'-'} size='p1' fontWeight='600' />
						<BodyText
							text={`${formatDateToString(event.endDate)}`}
							size='p1'
							fontWeight='600'
						/>
					</Box>
					<img src={event.image} alt='event' />
					<EditEventBtn event={event} onDelete={onDelete} />
				</Box>
				<Box className={s.cardWrapper_info}>
					<HeaderText
						text={event.title}
						size='h3'
						color={'var(--accent-light-color)'}
					/>
					<Box display='flex' gap='20px'>
						{event.categories?.map((category: ICategory, index: number) => (
							<Box key={`${index}-category`} className={s.cardWrapper_category}>
								<BodyText text={`${category.title}`} size='p2' />
							</Box>
						))}
					</Box>
				</Box>
			</Box>
		</Link>
	);
};
