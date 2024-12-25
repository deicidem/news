import { ManagerEventsIcon, ProfileAdminIcon } from '@/shared/icons';
import { THeaderLinks } from '@/features/header/ui/HeaderMenu/types';

export const headerLinksAdmin: THeaderLinks[] = [
	{
		link: 'admin/managerEvents',
		icon: <ManagerEventsIcon />,
	},
	{
		link: '/admin',
		icon: <ProfileAdminIcon />,
	},
];
