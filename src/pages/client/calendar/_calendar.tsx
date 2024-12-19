'use client';

import { Calendar } from '@/widgets/Calendar';
import { withClientAuthHOC } from '@/shared/HOCS';

const CalendarPage = () => {
	return <Calendar />;
};

export default withClientAuthHOC(CalendarPage);
