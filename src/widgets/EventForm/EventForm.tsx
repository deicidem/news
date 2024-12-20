import { useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import { Button, HeaderText, Loader } from '@/shared/components';
import { useMutation, useQuery } from '@blitzjs/rpc';
import { useRouter } from 'next/navigation';
import createEvent from '@/features/events/api/mutations/createEvent';
import s from './styled.module.scss';
import { toast } from 'react-toastify';
import { Suspense, useState } from 'react';
import getCategories from '@/features/events/api/queries/getCategories';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SearchAdminUsers } from '@/features/eventForm';
import {
	MutationDateRange,
	MutationSelectField,
	MutationTextField,
} from '@/shared/components/mutationsComponent';
import { SelectFormat } from '@/features/eventForm/selectFormat/SelectFormat';
import { EventFormData, TEventFormProps } from './types';
import { formatValidation } from './helpers/formatValidation';
import { defaultCreateValues } from '@/widgets/EventForm/helpers/defaultCreateValues';

export const EventForm = ({
	initialData,
	onSubmit: externalSubmit,
	submitButtonText = 'Создать событие',
}: TEventFormProps) => {
	const router = useRouter();
	const [createEventMutation] = useMutation(createEvent);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm<EventFormData>({
		defaultValues: initialData || defaultCreateValues,
	});

	const [categories] = useQuery(getCategories, undefined);

	const [selectedAdmins, setSelectedAdmins] = useState<IAdminSearch[]>([]);

	const handleAdminChange = (value: IAdminSearch[]) => {
		setSelectedAdmins(value);
		setValue(
			'authorIds',
			value.map((admin) => admin.id)
		);
	};

	const onSubmit = async (data: EventFormData) => {
		const isFormatValid = formatValidation[data.formatType](data);
		if (!isFormatValid) {
			toast.error('Неправильно заполнены поля формата');
			return;
		}
		try {
			const formattedData = {
				...data,
				startDate: new Date(data.startDate),
				endDate: new Date(data.endDate),
				authorIds: selectedAdmins.map((admin) => admin.id),
			};

			if (externalSubmit) {
				await externalSubmit(formattedData);
			} else {
				await createEventMutation(formattedData);
				toast.success('Событие успешно создано!');
				router.push('/admin/managerEvents');
			}
		} catch (error) {
			toast.error('Произошла ошибка при создании события');
			console.error('Error creating event:', error);
		}
	};

	return (
		<Suspense fallback={<Loader visible={true} />}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Box className={s.formWrapper}>
					<HeaderText
						text={initialData ? 'Редактирование события' : 'Создание события'}
						size='h1'
					/>

					<form onSubmit={handleSubmit(onSubmit)} className={s.form}>
						<MutationTextField
							name='title'
							label='Название события'
							register={register}
							required
							errors={errors}
						/>
						<MutationDateRange
							startDateName='startDate'
							endDateName='endDate'
							control={control}
							errors={errors}
						/>

						<SelectFormat
							control={control}
							errors={errors}
							register={register}
						/>
						<MutationSelectField
							name='categoryIds'
							label='Категории'
							control={control}
							errors={errors}
							options={categories || []}
							displayKey='title'
							multiple
							required
						/>

						<MutationTextField
							name='description'
							label='Описание'
							register={register}
							errors={errors}
							multiline
							fullWidth
							rows={4}
						/>

						<SearchAdminUsers
							selectedAdmins={selectedAdmins}
							onSelectedAdmins={handleAdminChange}
						/>

						<MutationTextField
							name='image'
							label='Ссылка на изображение'
							register={register}
							errors={errors}
							required
						/>

						<Box className={s.buttons}>
							<Button
								type='button'
								view='outlined-on-dark'
								label='Отмена'
								onClick={() => router.back()}
							/>
							<Button type='submit' view='primary' label={submitButtonText} />
						</Box>
					</form>
				</Box>
			</LocalizationProvider>
		</Suspense>
	);
};
