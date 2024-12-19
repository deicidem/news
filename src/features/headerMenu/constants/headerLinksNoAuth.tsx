import { AccountIcon } from '@/shared/icons';
import { THeaderLinks } from '@/features/headerMenu/types';
import { Box } from '@mui/material';
import { BodyText } from '@/shared/components';

export const headerLinksNoAuth: THeaderLinks[] = [
	{
		link: '/login',
		icon: (
			<Box display='flex' flexDirection='column' alignItems='center'>
				<AccountIcon />
				<BodyText text='войти' size='p2' />
			</Box>
		),
	},
];
