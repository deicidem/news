export {};

declare global {
	export interface IUserBase {
		login: string;
		password: string;
		firstName: string;
		lastName: string;
		patronymic?: string;
	}
}
