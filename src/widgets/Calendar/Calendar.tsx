'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './ui/calendar.scss';
import { eventsMocks } from '@/shared/api/mocks';
import { formatDateToString } from '@/shared/utils/formatDateToString';
import { HighlightedCalendarDays } from '@/features/calendar/ui';

type TCalendarProps = {
	onSelectEvent?: (data: string | Date) => void;
};

export const Calendar = ({ onSelectEvent }: TCalendarProps) => {
	const testEvents = [eventsMocks[1], eventsMocks[4]];

	//const [selectedEvent, setSelectedEvent] = useState(null);
	//const [drawerOpen, setDrawerOpen] = useState(false);
	const [highlightedDays, setHighlightedDays] = useState<string[]>([]);
	console.log(highlightedDays);

	useEffect(() => {
		// Извлекаем даты конференций в формате YYYY-MM-DD
		const daysToHighlight = testEvents.map((event) =>
			formatDateToString(event.startDate, 'yyyy-MM-dd')
		);
		console.log(daysToHighlight);
		setHighlightedDays(daysToHighlight);
	}, []);

	// const handleDateClick = (date: Dayjs) => {
	// 	const event = testEvents.find(
	// 		(event) =>
	// 			formatDateToString(event.startDate, 'yyyy-MM-dd') ===
	// 			date.format('YYYY-MM-DD')
	// 	);
	// 	if (event) {
	// 		setSelectedEvent(event);
	// 		setDrawerOpen(true);
	// 		if (onSelectEvent) {
	// 			console.log(date.toISOString());
	// 			onSelectEvent(date.toISOString());
	// 		}
	// 	}
	// };

	// const handleCloseDrawer = () => {
	// 	setDrawerOpen(false);
	// 	setSelectedEvent(null);
	// };

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box display='flex' alignItems='center' width='100%' flex='1'>
				<DateCalendar
					//onClickDay={handleDateClick}
					//onClick={(e) => console.log(e)}
					renderLoading={() => <div>Loading...</div>}
					slots={{
						day: (dayProps) => (
							<HighlightedCalendarDays
								{...dayProps}
								highlightedDays={highlightedDays}
							/>
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
