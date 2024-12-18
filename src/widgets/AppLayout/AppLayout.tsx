'use client';
import { ReactNode, useEffect } from 'react';
import { useAppDispatch } from '@/shared/hooks/storeHooks';
import { useAppSelector } from '@/shared/hooks/storeHooks/useAppSelector';
import {
	loadingSlice,
	selectIsLoading,
} from '@/app/store/slices/loading/loadingSlice';
import { Loader } from '@/shared/components';
import { Footer, Header } from '@/widgets';
import { usePathname } from 'next/navigation';

export function AppLayout({ children }: { children: ReactNode }) {
	const dispatch = useAppDispatch();
	const pathname = usePathname();

	const isLoading = useAppSelector(selectIsLoading);

	useEffect(() => {
		dispatch(loadingSlice.actions.setLoading(true));

		const timeout = setTimeout(() => {
			dispatch(loadingSlice.actions.setLoading(false));
		}, 500);

		return () => clearTimeout(timeout);
	}, [pathname, dispatch]);

	return (
		<>
			{isLoading && <Loader />}
			<div className='root'>
				<Header />
				<div className='wrapper-page'>{children}</div>
				<Footer />
			</div>
		</>
	);
}
