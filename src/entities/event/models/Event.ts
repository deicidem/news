export interface IEvent {
	id: string;
	//author: IUserBase;
	authorId: string;
	createdAt: Date | string;
	updatedAt?: Date | string;
	updatedBy?: IUserBase | string;
	title: string;
	startDate: Date | string;
	endDate: Date | string;
	format: IOnlineFormat | IOfflineFormat | IHybridFormat;
	description?: string;
	image: string;
	categories?: ICategory[] | string[];
}
