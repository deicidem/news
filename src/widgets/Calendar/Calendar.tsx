'use client';
import React, { useEffect, useState } from 'react';
import { Box, Drawer, Typography, Button, Badge } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {
	LocalizationProvider,
	PickersDay,
	PickersDayProps,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import './ui/calendar.scss';

// Пример данных о конференциях
const events = [
	{
		id: '1',
		title: 'Cybersecurity Awareness Conference',
		date: '2024-11-20',
		description: 'Learn about the latest in cybersecurity.',
	},
	{
		id: '2',
		title: 'Data Science and Analytics Conference',
		date: '2024-12-05',
		description: 'Explore data science trends and techniques.',
	},
];

function ServerDay(
	props: PickersDayProps<Dayjs> & { highlightedDays?: string[] }
) {
	const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

	const isHighlighted =
		!outsideCurrentMonth && highlightedDays.includes(day.format('YYYY-MM-DD'));

	return (
		<Badge
			key={day.toString()}
			overlap='circular'
			badgeContent={isHighlighted ? '🌟' : undefined} // Значок для отмеченных дней
		>
			<PickersDay {...other} day={day} />
		</Badge>
	);
}

export const Calendar = () => {
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [highlightedDays, setHighlightedDays] = useState<string[]>([]);

	useEffect(() => {
		// Извлекаем даты конференций в формате YYYY-MM-DD
		const daysToHighlight = events.map((event) => event.date);
		setHighlightedDays(daysToHighlight);
	}, []);

	const handleDateClick = (date: Dayjs) => {
		const event = events.find(
			(event) => event.date === date.format('YYYY-MM-DD')
		);
		if (event) {
			setSelectedEvent(event);
			setDrawerOpen(true);
		}
	};

	const handleCloseDrawer = () => {
		setDrawerOpen(false);
		setSelectedEvent(null);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box display='flex' alignItems='center' width='100%' flex='1'>
				<DateCalendar
					onClickDay={handleDateClick}
					renderLoading={() => <div>Loading...</div>}
					slots={{
						day: (dayProps) => (
							<ServerDay {...dayProps} highlightedDays={highlightedDays} />
						),
					}}
				/>
				{/*<Drawer anchor='right' open={drawerOpen} onClose={handleCloseDrawer}>*/}
				{/*	<Box p={2} width={300} role='presentation'>*/}
				{/*		{selectedEvent && (*/}
				{/*			<>*/}
				{/*				<Typography variant='h6'>{selectedEvent.title}</Typography>*/}
				{/*				<Typography variant='body2'>*/}
				{/*					{selectedEvent.description}*/}
				{/*				</Typography>*/}
				{/*				<Button onClick={handleCloseDrawer}>Закрыть</Button>*/}
				{/*			</>*/}
				{/*		)}*/}
				{/*	</Box>*/}
				{/*</Drawer>*/}
			</Box>
		</LocalizationProvider>
	);
};

export default Calendar;
