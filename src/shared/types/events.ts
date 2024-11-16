export {};

declare global {
	export interface ICategory {
		id: string;
		title: string;
	}

	export interface IOnlineFormat {
		formatName: 'онлайн' | string;
		link: string;
	}

	export interface IOfflineFormat {
		formatName: 'офлайн' | string;
		address: string;
	}

	export interface IHybridFormat {
		formatName: 'гибрид' | string;
		link: string;
		address: string;
	}
}
