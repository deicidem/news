import { ProfileClientIcon, CalendarIcon } from '@/shared/icons';
import { THeaderLinks } from '@/features/headerMenu/types';

export const headerLinksClient: THeaderLinks[] = [
	{
		link: '/client/calendar',
		icon: <CalendarIcon />,
	},
	{
		link: '/client',
		icon: <ProfileClientIcon />,
	},
];
