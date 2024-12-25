import { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@blitzjs/rpc';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import createEvent from '@/features/event/api/mutations/createEvent';
import {
	SearchAdminUsers,
	SelectFormat,
	SelectCategories,
} from '@/features/event/ui/eventForm';
import { Button, HeaderText, Loader } from '@/shared/components';
import {
	MutationDateRange,
	MutationTextField,
} from '@/shared/components/mutationsComponent';
import { EventFormData, TEventFormProps } from './types';
import { defaultCreateValues } from './helpers/defaultCreateValues';
import { formatValidation } from './helpers/formatValidation';
import s from './styled.module.scss';
import searchAdmins from '@/features/user/api/queries/searchAdmins';

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

	const [categories, setCategoriesData] = useState<ICategory[]>([]);
	const [selectedAdmins, setSelectedAdmins] = useState<IAdminSearch[]>([]);

	useEffect(() => {
		if (initialData) {
			setValue('formatType', initialData.formatType);
			if (initialData.link) setValue('link', initialData.link);
			if (initialData.address) setValue('address', initialData.address);
			if (Array.isArray(initialData.categoryIds)) {
				setValue('categoryIds', initialData.categoryIds);
			}
			// if (Array.isArray(initialData.authorIds)) {
			// 	setValue('authorIds', initialData.authorIds);
			// }
		}
	}, [initialData, categories]);

	useEffect(() => {
		if (initialData && Array.isArray(initialData.authorIds)) {
			setSelectedAdmins(initialData.authorIds.map((id) => ({ id })));
		}
	}, [initialData]);

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
				toast.success(initialData ? 'Событие обновлено!' : 'Событие создано!');
				router.push('/admin/managerEvents');
			}
		} catch (error) {
			toast.error(
				initialData
					? 'Произошла ошибка при обновлении события'
					: 'Произошла ошибка при создании события'
			);
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
							onSetValue={setValue}
							defaultFormatType={initialData?.formatType || null}
						/>
						<SelectCategories
							categories={categories}
							onSetCategoriesData={setCategoriesData}
							errors={errors}
							control={control}
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
