import { useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import { Button, HeaderText, Loader } from '@/shared/components';
import { useMutation } from '@blitzjs/rpc';
import { useRouter } from 'next/navigation';
import createEvent from '@/features/events/api/mutations/createEvent';
import s from './styled.module.scss';
import { toast } from 'react-toastify';
import { Suspense, useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SearchAdminUsers } from '@/features/eventForm';
import {
	MutationDateRange,
	MutationTextField,
} from '@/shared/components/mutationsComponent';
import { SelectFormat } from '@/features/eventForm/selectFormat/SelectFormat';
import { EventFormData, TEventFormProps } from './types';
import { formatValidation } from './helpers/formatValidation';
import { defaultCreateValues } from '@/widgets/EventForm/helpers/defaultCreateValues';
import { SelectCategories } from '@/features/eventForm/categorySelectField/SelectCategories';

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
		if (initialData?.authorIds && Array.isArray(initialData.authorIds)) {
			const initialAdmins = categories.filter((admin) =>
				initialData.authorIds.includes(admin.id)
			);
			setSelectedAdmins(initialAdmins);
		}

		if (initialData) {
			setValue('formatType', initialData.formatType);
			if (initialData.link) setValue('link', initialData.link);
			if (initialData.address) setValue('address', initialData.address);
			if (Array.isArray(initialData.categoryIds)) {
				setValue('categoryIds', initialData.categoryIds);
			}
		}
	}, [initialData, categories]);
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

	console.log(defaultCreateValues);
	console.log(initialData);
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
							options={categories || []}
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
