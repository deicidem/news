'use client';
import { ReactNode, useEffect, useState } from 'react';
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
	const [content, setContent] = useState<ReactNode>(children);

	useEffect(() => {
		dispatch(loadingSlice.actions.setLoading(true));

		const timeout = setTimeout(() => {
			setContent(children);
			dispatch(loadingSlice.actions.setLoading(false));
		}, 500);

		return () => clearTimeout(timeout);
	}, [pathname, dispatch]);

	return (
		<>
			<Loader visible={isLoading} />
			<div className='root'>
				<Header />
				<div className='wrapper-page'>{content}</div>
				<Footer />
			</div>
		</>
	);
}
