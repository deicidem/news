import {
	MutationSelectField,
	MutationTextField,
} from '@/shared/components/mutationsComponent';
import { useEffect, useState } from 'react';
import {
	Control,
	FieldErrors,
	UseFormRegister,
	UseFormSetValue,
} from 'react-hook-form';

type TSelectFormatProps = {
	control: Control<any>;
	errors: FieldErrors;
	register: UseFormRegister<any>;
	onSetValue: UseFormSetValue<any>;
	defaultFormatType: 'онлайн' | 'офлайн' | 'гибрид' | null;
};
export const SelectFormat = ({
	control,
	register,
	errors,
	onSetValue,
	defaultFormatType,
}: TSelectFormatProps) => {
	const [selectedFormatType, setSelectedFormatType] = useState<
		'онлайн' | 'офлайн' | 'гибрид' | null
	>(defaultFormatType || null);
	useEffect(() => {
		if (defaultFormatType) {
			onSetValue('formatType', defaultFormatType);
			setSelectedFormatType(defaultFormatType);
		}
	}, [defaultFormatType]);

	const handleFormatTypeChange = (value: string) => {
		const formatType = value as 'онлайн' | 'офлайн' | 'гибрид';
		setSelectedFormatType(formatType);
		if (formatType === 'онлайн') {
			onSetValue('address', '');
		} else if (formatType === 'офлайн') {
			onSetValue('link', '');
		}
	};
	const formatTypeOptions = [
		{ id: 'онлайн', formatName: 'онлайн' },
		{ id: 'офлайн', formatName: 'офлайн' },
		{ id: 'гибрид', formatName: 'гибрид' },
	];

	return (
		<>
			<MutationSelectField
				name='formatType'
				label='Тип формата'
				control={control}
				errors={errors}
				options={formatTypeOptions}
				displayKey='formatName'
				required
				onChange={handleFormatTypeChange}
			/>

			{(selectedFormatType === 'онлайн' || selectedFormatType === 'гибрид') && (
				<MutationTextField
					name='link'
					label='Ссылка на онлайн мероприятие'
					register={register}
					errors={errors}
					required={selectedFormatType === 'онлайн'}
				/>
			)}

			{(selectedFormatType === 'офлайн' || selectedFormatType === 'гибрид') && (
				<MutationTextField
					name='address'
					label='Адрес проведения'
					register={register}
					errors={errors}
					required={selectedFormatType === 'офлайн'}
				/>
			)}
		</>
	);
};
