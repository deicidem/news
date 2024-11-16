export interface IUser extends IUserBase {
	role: 'admin' | 'client';
	password: string;
}
