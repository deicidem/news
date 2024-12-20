export type EventFormData = {
	title: string;
	startDate: string;
	endDate: string;
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
