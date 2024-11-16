import {
	EventsIcon,
	ManagerEventsIcon,
	ProfileAdminIcon,
} from '@/shared/icons';
import { THeaderLinks } from '@/features/headerMenu/types';

export const headerLinksAdmin: THeaderLinks[] = [
	{
		link: '/events',
		icon: <EventsIcon />,
	},
	{
		link: '/admin',
		icon: <ManagerEventsIcon />,
	},
	{
		link: '/admin',
		icon: <ProfileAdminIcon />,
	},
];
