'use client';

import '@/app/styles/globals.scss';
import '@/app/layoutStyled.scss';
import { getBlitzContext } from '@/app/blitz-server';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function ProtectedLayout({
	children,
}: {
	children: ReactNode;
}) {
	const ctx = await getBlitzContext();
	if (!ctx.session.$isAuthorized()) {
		redirect('/login');
	}
	return children;
}
