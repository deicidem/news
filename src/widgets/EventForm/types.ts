export type EventFormData = {
	id?: string;
	formatId?: string;
	title: string;
	startDate: string | Date;
	endDate: string | Date;
	formatType: 'online' | 'offline' | 'hybrid';
	link?: string;
	address?: string;
	description?: string;
	image: string;
	categoryIds: string[];
	authorIds: string[];
};

export type TEventFormProps = {
	initialData?: EventFormData;
	onSubmit?: (data: EventFormData) => void;
	submitButtonText?: string;
};
