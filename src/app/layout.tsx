import React, { StrictMode } from 'react';
import { Footer, Header } from '@/widgets';
// import { Provider } from 'react-redux';
// import store from '@/app/store';
import '@/app/styles/globals.scss';
import './layoutStyled.scss';

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
			</head>
			<body>
				<StrictMode>
					{/*<Provider store={store}>*/}
					{/*<PersistGate loading={null} persistor={persistor}>*/}
					<div className='root'>
						<Header />
						<div className='wrapper-page'>{children}</div>
						<Footer />
					</div>
					{/*</PersistGate>*/}
					{/*</Provider>*/}
				</StrictMode>
			</body>
		</html>
	);
}
