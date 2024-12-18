'use client';
import { Box } from '@mui/material';
import s from './ui/headerMenuStyles.module.scss';
import Link from 'next/link';
import { headerLinksClient } from '@/features/headerMenu/constants/headerLinksClient';
import { EventsIcon } from '@/shared/icons';
import { HeaderText } from '@/shared/components';
import { useSession } from '@blitzjs/auth';
import { LogoutButton } from '@/features/logoutBtn/LogoutButton';
import { headerLinksAdmin } from '@/features/headerMenu/constants/headerLinksAdmin';
import { headerLinksNoAuth } from '@/features/headerMenu/constants/headerLinksNoAuth';
import { THeaderLinks } from '@/features/headerMenu/types';
import { useEffect, useMemo, useState } from 'react';

export const HeaderMenu = () => {
	const session = useSession();

	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const [prevUserId, setPrevUserId] = useState(session.userId);

	useEffect(() => {
		if (prevUserId && !session.userId) {
			setIsLoggingOut(true);
		} else if (!prevUserId && session.userId) {
			setIsLoggingOut(false);
		}
		setPrevUserId(session.userId);
	}, [session.userId, prevUserId]);

	const navLinks: THeaderLinks[] = useMemo(() => {
		if (!session.userId) return headerLinksNoAuth;
		return session.role === 'ADMIN' ? headerLinksAdmin : headerLinksClient;
	}, [session.userId, session.role]);

	return (
		<Box className={s.wrapper}>
			<Box className={s.wrapper_content}>
				<Link href='/'>
					<Box className={s.wrapper_logo}>
						<EventsIcon />
						<HeaderText text='EVENTCONF' size='h3' color='var(--text-form)' />
					</Box>
				</Link>
				<Box className={s.wrapper_content_icons}>
					{navLinks.map((item) => (
						<Link href={item.link} key={`${item.link}`}>
							{item.icon}
						</Link>
					))}
					{(session.userId || isLoggingOut) && <LogoutButton />}
				</Box>
			</Box>
		</Box>
	);
};
