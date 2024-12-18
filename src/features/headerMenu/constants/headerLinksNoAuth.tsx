import { EventsIcon, AccountIcon } from '@/shared/icons';
import { THeaderLinks } from '@/features/headerMenu/types';

export const headerLinksNoAuth: THeaderLinks[] = [
	{
		link: '/events',
		icon: <EventsIcon />,
	},
	{
		link: '/login',
		icon: <AccountIcon />,
	},
];
