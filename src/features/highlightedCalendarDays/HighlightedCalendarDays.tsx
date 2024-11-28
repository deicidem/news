import { PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { Badge } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '@/shared/hooks/storeHooks';
import { useAppSelector } from '@/shared/hooks/storeHooks/useAppSelector';
import {
	selectedDateActions,
	selectedDateSelectors,
} from '@/app/store/slices/selectedDate';

export const HighlightedCalendarDays = (
	props: PickersDayProps<Dayjs> & {
		highlightedDays?: string[];
	}
) => {
	const dispatch = useAppDispatch();
	const { highlightedDays = [], day, ...other } = props;

	const isHighlighted = highlightedDays.includes(day.format('YYYY-MM-DD'));
	const handleClick = () => {
		if (isHighlighted) {
			dispatch(selectedDateActions.setSelectedDate(day.format('DD.MM.YYYY')));
		}
	};
	const currentDate = useAppSelector(selectedDateSelectors.getSelectedDate);
	console.log(currentDate);

	return (
		<Badge
			key={day.toString()}
			overlap='circular'
			badgeContent={
				isHighlighted ? (
					<div
						style={{
							width: '10px',
							height: '10px',
							borderRadius: '50%',
							backgroundColor: 'var(--custom-lilac)',
							position: 'absolute',
							top: '5px',
							left: '50%',
							transform: 'translateX(-50%)',
						}}
					/>
				) : undefined
			}>
			<PickersDay
				{...other}
				day={day}
				onClick={handleClick}
				sx={{
					color: isHighlighted ? 'var(--custom-lilac) !important' : undefined,
					'&:hover': {
						backgroundColor: isHighlighted
							? 'var(--custom-dark-gray)'
							: undefined,
					},
				}}
			/>
		</Badge>
	);
};
