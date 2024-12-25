import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import { IEvent } from '@/entities/event';
import s from './styled.module.scss';
import { HeaderText } from '@/shared/components';

type TEventHeaderDetailProps = {
	event: IEvent;
	btnBack: ReactNode;
};

export const EventHeaderDetail = ({
	event,
	btnBack,
}: TEventHeaderDetailProps) => {
	return (
		<Box className={s.wrapper}>
			<Box className={s.wrapper_btn}>{btnBack}</Box>
			<Box
				className={s.imageBlock}
				sx={{ background: `url('${event.image}')` }}>
				<img src={event.image} alt='header-event' />
			</Box>
			<Box className={s.wrapper_title}>
				<HeaderText text={event.title} size='h1' />
			</Box>
		</Box>
	);
};
