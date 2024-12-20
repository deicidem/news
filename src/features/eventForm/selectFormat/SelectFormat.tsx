import {
	MutationSelectField,
	MutationTextField,
} from '@/shared/components/mutationsComponent';
import { useState } from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

type TSelectFormatProps = {
	control: Control<any>;
	errors: FieldErrors;
	register: UseFormRegister<any>;
};
export const SelectFormat = ({
	control,
	register,
	errors,
}: TSelectFormatProps) => {
	const [selectedFormatType, setSelectedFormatType] = useState<
		'online' | 'offline' | 'hybrid' | null
	>(null);
	const handleFormatTypeChange = (value: string) => {
		setSelectedFormatType(value as 'online' | 'offline' | 'hybrid');
	};

	const formatTypeOptions = [
		{ id: 'online', formatName: 'Онлайн' },
		{ id: 'offline', formatName: 'Офлайн' },
		{ id: 'hybrid', formatName: 'Гибрид' },
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

			{selectedFormatType === 'online' || selectedFormatType === 'hybrid' ? (
				<MutationTextField
					name='link'
					label='Ссылка на онлайн мероприятие'
					register={register}
					errors={errors}
					required={selectedFormatType === 'online'}
				/>
			) : null}

			{selectedFormatType === 'offline' || selectedFormatType === 'hybrid' ? (
				<MutationTextField
					name='address'
					label='Адрес проведения'
					register={register}
					errors={errors}
					required={selectedFormatType === 'offline'}
				/>
			) : null}
		</>
	);
};
