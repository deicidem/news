'use client';
import React, { StrictMode } from 'react';
import { AppLayout } from '@/widgets/AppLayout';
import '@/app/styles/globals.scss';
import './layoutStyled.scss';
import { Provider } from 'react-redux';
import store from '@/app/store';
import { QueryClient, QueryClientProvider } from '@blitzjs/rpc';
import { BlitzProvider } from './blitz-client';

const queryClient = new QueryClient();
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head>
				<title>Event Management App</title>
				<link rel='icon' href='/favicon.ico' />
				<meta name='msapplication-TileImage' content='' />
				<meta name='theme-color' content='#232323' />
			</head>
			<body>
				<StrictMode>
					<Provider store={store}>
						<QueryClientProvider client={queryClient}>
							<BlitzProvider>
								{/*<PersistGate loading={null} persistor={persistor}>*/}
								{/*<div className='root'>*/}
								{/*	<Header />*/}
								{/*	<div className='wrapper-page'>{children}</div>*/}
								{/*	<Footer />*/}
								{/*</div>*/}
								<AppLayout>{children}</AppLayout>
								{/*</PersistGate>*/}
							</BlitzProvider>
						</QueryClientProvider>
					</Provider>
				</StrictMode>
			</body>
		</html>
	);
}
