import { useForm, Controller } from 'react-hook-form';
import { Autocomplete, Box, MenuItem, TextField } from '@mui/material';
import { Button, HeaderText, Loader } from '@/shared/components';
import { useMutation, useQuery } from '@blitzjs/rpc';
import { useRouter } from 'next/navigation';
import createEvent from '@/features/events/api/mutations/createEvent';
import s from './styled.module.scss';
import { toast } from 'react-toastify';
import { Suspense, useEffect, useState } from 'react';
import getFormats from '@/features/events/api/queries/getFormats';
import getCategories from '@/features/events/api/queries/getCategories';
import { debounce } from 'lodash';
import searchAdmins from '@/features/user/api/queries/searchAdmins';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type EventFormData = {
	title: string;
	startDate: string;
	endDate: string;
	formatId: string;
	description?: string;
	image: string;
	categoryIds: string[];
	authorIds: string[];
};

type EventFormProps = {
	initialData?: EventFormData;
	onSubmit?: (data: EventFormData) => void;
	submitButtonText?: string;
};

type AdminUser = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
};

export const EventForm = ({
	initialData,
	onSubmit: externalSubmit,
	submitButtonText = 'Создать событие',
}: EventFormProps) => {
	const router = useRouter();
	const [createEventMutation] = useMutation(createEvent);
	const [searchTerm, setSearchTerm] = useState('');
	const [admins, setAdmins] = useState<AdminUser[]>([]);
	const [selectedAdmins, setSelectedAdmins] = useState<AdminUser[]>([]);

	const formatDateForInput = (date: Date) => {
		return date.toISOString().slice(0, 16);
	};

	const defaultValues = {
		title: '',
		startDate: new Date(),
		endDate: new Date(Date.now() + 3600000),
		formatId: '',
		description: '',
		image: '',
		categoryIds: [],
		authorIds: [],
	};

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm<EventFormData>({
		defaultValues: initialData || defaultValues,
	});

	const [formats] = useQuery(getFormats, undefined);
	const [categories] = useQuery(getCategories, undefined);

	const searchAdminUsers = async (email: string) => {
		if (email.length >= 2) {
			const foundAdmins = await searchAdmins(email);
			setAdmins(foundAdmins);
		} else {
			setAdmins([]);
		}
	};

	const debouncedSearch = debounce(searchAdminUsers, 300);

	useEffect(() => {
		debouncedSearch(searchTerm);
		return () => {
			debouncedSearch.cancel();
		};
	}, [searchTerm]);

	const handleAdminChange = (_: any, value: AdminUser[]) => {
		setSelectedAdmins(value);
		setValue(
			'authorIds',
			value.map((admin) => admin.id)
		);
	};

	const onSubmit = async (data: EventFormData) => {
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
						<TextField
							label='Название события'
							fullWidth
							{...register('title', { required: 'Обязательное поле' })}
							error={!!errors.title}
							helperText={errors.title?.message}
						/>

						<Controller
							name='startDate'
							control={control}
							rules={{ required: 'Обязательное поле' }}
							render={({ field: { onChange, value } }) => (
								<DateTimePicker
									label='Дата начала'
									value={dayjs(value)}
									onChange={(date) => onChange(date ? date.toDate() : null)}
									views={['year', 'month', 'day', 'hours', 'minutes']}
									format='DD.MM.YYYY HH:mm'
									ampm={false}
									slotProps={{
										textField: {
											fullWidth: true,
											error: !!errors.startDate,
											helperText: errors.startDate?.message,
										},
									}}
								/>
							)}
						/>

						<Controller
							name='endDate'
							control={control}
							rules={{ required: 'Обязательное поле' }}
							render={({ field: { onChange, value } }) => (
								<DateTimePicker
									label='Дата окончания'
									value={dayjs(value)}
									onChange={(date) => onChange(date ? date.toDate() : null)}
									views={['year', 'month', 'day', 'hours', 'minutes']}
									format='DD.MM.YYYY HH:mm'
									ampm={false}
									minDateTime={dayjs(value)}
									slotProps={{
										textField: {
											fullWidth: true,
											error: !!errors.endDate,
											helperText: errors.endDate?.message,
										},
									}}
								/>
							)}
						/>

						<Controller
							name='formatId'
							control={control}
							rules={{ required: 'Обязательное поле' }}
							render={({ field }) => (
								<TextField
									select
									label='Формат'
									fullWidth
									error={!!errors.formatId}
									helperText={errors.formatId?.message}
									{...field}>
									{formats?.map((format) => (
										<MenuItem key={format.id} value={format.id}>
											{format.formatName}
										</MenuItem>
									))}
								</TextField>
							)}
						/>

						<Controller
							name='categoryIds'
							control={control}
							rules={{ required: 'Выберите хотя бы одну категорию' }}
							render={({ field }) => (
								<TextField
									select
									label='Категории'
									fullWidth
									SelectProps={{ multiple: true }}
									error={!!errors.categoryIds}
									helperText={errors.categoryIds?.message}
									{...field}>
									{categories?.map((category) => (
										<MenuItem key={category.id} value={category.id}>
											{category.title}
										</MenuItem>
									))}
								</TextField>
							)}
						/>

						<Autocomplete
							multiple
							options={admins}
							value={selectedAdmins}
							onChange={handleAdminChange}
							getOptionLabel={(option) =>
								`${option.email} (${option.firstName} ${option.lastName})`
							}
							renderInput={(params) => (
								<TextField
									{...params}
									label='Соавторы'
									onChange={(e) => setSearchTerm(e.target.value)}
									helperText='Введите минимум 2 символа для поиска'
								/>
							)}
						/>

						<TextField
							label='Описание'
							multiline
							rows={4}
							fullWidth
							{...register('description')}
						/>

						<TextField
							label='Ссылка на изображение'
							fullWidth
							{...register('image', { required: 'Обязательное поле' })}
							error={!!errors.image}
							helperText={errors.image?.message}
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
