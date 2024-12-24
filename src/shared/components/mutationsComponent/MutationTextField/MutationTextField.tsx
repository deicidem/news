import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

type FormTextFieldProps = {
	name: string;
	label: string;
	register: UseFormRegister<any>;
	errors: FieldErrors;
	required?: boolean;
} & Omit<TextFieldProps, 'name' | 'label'>;

export const MutationTextField = ({
	name,
	label,
	register,
	errors,
	required = false,
	...props
}: FormTextFieldProps) => {
	return (
		<TextField
			label={label}
			fullWidth
			{...register(name, { required: required ? 'Обязательное поле' : false })}
			error={!!errors[name]}
			helperText={errors[name]?.message as string}
			sx={{
				'& .MuiInputBase-root': {
					background: 'var(--background-gray)',
					color: 'var(--white-color)',
					borderRadius: '12px',
				},
				'& .MuiInputLabel-root': {
					color: 'var(--text-secondary)',
					'&.Mui-focused': {
						color: 'var(--white-color)',
					},
				},
				'& .MuiOutlinedInput-notchedOutline': {
					borderColor: 'var(--custom-gray)',
				},
				'& .Mui-focused .MuiOutlinedInput-notchedOutline': {
					borderColor: 'var(--white-color)',
				},
			}}
			{...props}
		/>
	);
};
