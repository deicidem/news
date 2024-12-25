import {
	Control,
	FieldErrors,
	UseFormRegister,
	UseFormSetValue,
} from 'react-hook-form';

export type TSelectFormatProps = {
	control: Control<any>;
	errors: FieldErrors;
	register: UseFormRegister<any>;
	onSetValue: UseFormSetValue<any>;
	defaultFormatType: TFormat;
};

export type TFormat = 'онлайн' | 'офлайн' | 'гибрид' | null;
