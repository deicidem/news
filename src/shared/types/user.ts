export {};

declare global {
	export interface IUserBase {
		login: string;
		password: string;
		firstName: string;
		lastName: string;
		patronymic?: string;
	}

	export interface IAdminSearch {
		id: string;
		email: string;
		firstName: string;
		lastName: string;
	}
}
