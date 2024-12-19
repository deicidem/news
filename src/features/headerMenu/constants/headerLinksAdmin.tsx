import { ManagerEventsIcon, ProfileAdminIcon } from '@/shared/icons';
import { THeaderLinks } from '@/features/headerMenu/types';

export const headerLinksAdmin: THeaderLinks[] = [
	{
		link: '/admin',
		icon: <ManagerEventsIcon />,
	},
	{
		link: '/admin',
		icon: <ProfileAdminIcon />,
	},
];
