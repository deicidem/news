import { Controller, Control, FieldErrors, useWatch } from 'react-hook-form';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Box } from '@mui/material';
import { sxStyles } from './styled';

type DateTimeRangeProps = {
	startDateName: string;
	endDateName: string;
	control: Control<any>;
	errors: FieldErrors;
};

export const MutationDateRange = ({
	startDateName,
	endDateName,
	control,
	errors,
}: DateTimeRangeProps) => {
	const startDate = useWatch({
		control,
		name: startDateName,
	});
	return (
		<Box display='flex' gap='16px'>
			<Controller
				name={startDateName}
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
								error: !!errors[startDateName],
								helperText: errors[startDateName]?.message,
								sx: sxStyles,
							},
						}}
					/>
				)}
			/>

			<Controller
				name={endDateName}
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
						minDateTime={dayjs(startDate)} // Используем значение из useWatch
						slotProps={{
							textField: {
								fullWidth: true,
								error: !!errors[endDateName],
								helperText: errors[endDateName]?.message,
								sx: sxStyles,
							},
						}}
					/>
				)}
			/>
		</Box>
	);
};
