import { ReactNode } from 'react';
import { UrlObject } from 'url';

export type THeaderLinks = {
	link: UrlObject;
	icon: ReactNode | JSX.Element;
};
