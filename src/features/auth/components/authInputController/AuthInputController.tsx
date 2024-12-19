import { Control, FieldErrors, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import s from './styled.module.scss';

type TAuthInputProps = {
	name: string;
	control: Control<any>;
	label: string;
	required?: boolean;
	errors: FieldErrors;
};

export const AuthInputController = ({
	name,
	control,
	label,
	required = false,
	errors,
}: TAuthInputProps) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<TextField
					className={s.authTextField}
					margin='normal'
					label={label}
					type={name === 'password' ? 'password' : 'email'}
					fullWidth
					required={required}
					autoComplete={name === 'email' ? 'email' : undefined}
					error={!!errors[name]?.message}
					helperText={errors[name]?.message as string}
					sx={{
						'& label': {
							color: 'var(--text-secondary)',
							'&.Mui-focused': {
								color: 'var(--white-color)',
							},
							'&.Mui-error': {
								color: 'var(--custom-red)',
							},
						},
						'& .MuiInputBase-root': {
							color: 'var(--white-color)',
							backgroundColor: 'var(--background-gray)',
							borderRadius: '12px',
							'&:hover': {
								'& .MuiOutlinedInput-notchedOutline': {
									borderColor: 'var(--white-color)',
								},
							},
							'&.Mui-focused': {
								'& .MuiOutlinedInput-notchedOutline': {
									borderColor: 'var(--white-color)',
								},
							},
							'&.Mui-error': {
								'& .MuiOutlinedInput-notchedOutline': {
									borderColor: 'var(--custom-red)',
								},
							},
						},
						'& .MuiOutlinedInput-notchedOutline': {
							borderColor: 'var(--custom-gray)',
						},
						'& .MuiInputBase-input': {
							padding: '12px 16px',
							'&::placeholder': {
								color: 'var(--text-secondary)',
								opacity: 1,
							},
						},
						'& .MuiFormHelperText-root': {
							color: 'var(--text-secondary)',
							'&.Mui-error': {
								color: 'var(--custom-red)',
							},
						},
						'& .Mui-disabled': {
							backgroundColor: 'var(--custom-dark-gray)',
							opacity: 0.7,
							'& .MuiOutlinedInput-notchedOutline': {
								borderColor: 'var(--custom-gray)',
							},
						},
					}}
					{...field}
				/>
			)}
		/>
	);
};
