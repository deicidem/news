import { EventsIcon, AccountIcon } from '@/shared/icons';
import { THeaderLinks } from '@/features/headerMenu/types';

export const headerLinksClient: THeaderLinks[] = [
	{
		link: '/events',
		icon: <EventsIcon />,
	},
	{
		link: '/login',
		icon: <AccountIcon />,
	},
];
