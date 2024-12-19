'use client';

import { SignUpFormValues } from './types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpFormSchema } from '@/shared/utils';
// import { userActions } from '../../../storage/slices/user';
// import { toast } from 'react-toastify';
// import { getMessageFromError } from '../../../utils/errorUtils';
import { Box, Container, FormControlLabel, Switch } from '@mui/material';
import { BodyText, HeaderText } from '@/shared/components';
import s from '../styles..module.scss';
import { AuthInputController, AuthButtons } from '@/features/auth';
import { useMutation } from '@blitzjs/rpc';
import signup from '@/features/auth/api/mutations/signup';
import { useRouter } from 'next/navigation';

export const SignUpForm = () => {
	const router = useRouter();
	const [signupMutation] = useMutation(signup);

	const {
		control,
		handleSubmit,
		setError,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<SignUpFormValues>({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			isAdmin: false,
		},
		resolver: yupResolver(signUpFormSchema),
	});

	const submitHandler: SubmitHandler<SignUpFormValues> = async (values) => {
		try {
			await signupMutation(values);
			router.replace('/login');
		} catch (error: any) {
			if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
				setError('email', {
					type: 'manual',
					message: 'Этот email уже используется',
				});
			} else {
				setError('root', {
					type: 'manual',
					message:
						'Произошла ошибка при регистрации. Пожалуйста, попробуйте позже.',
				});
			}
		}
	};

	return (
		<Container component='main' className={s.wrapper}>
			<Box className={s.wrapper_content}>
				<HeaderText text='Регистрация' size='h1' />
				<Box
					component='form'
					onSubmit={handleSubmit(submitHandler)}
					noValidate
					className={s.wrapper_form}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
						}}>
						<AuthInputController
							name='firstName'
							control={control}
							label='Введите имя'
							required
							errors={errors}
						/>
						<AuthInputController
							name='lastName'
							control={control}
							label='Введите фамилию'
							required
							errors={errors}
						/>
						<AuthInputController
							name='email'
							control={control}
							label='Введите email'
							required
							errors={errors}
						/>
						<AuthInputController
							name='password'
							control={control}
							label='Введите пароль'
							required
							errors={errors}
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
							color: 'var(--text-form)',
						}}>
						<Controller
							name='isAdmin'
							control={control}
							render={({ field }) => (
								<FormControlLabel
									control={
										<Switch
											{...field}
											checked={field.value}
											sx={{
												'& .MuiSwitch-switchBase.Mui-checked': {
													color: 'var(--accent-light-color)',
												},
												'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track':
													{
														backgroundColor: 'var(--accent-color)',
													},
											}}
										/>
									}
									label='Зарегистрироваться как модератор'
								/>
							)}
						/>
					</Box>
					<BodyText
						text='Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности и соглашаетесь на информационную рассылку.'
						size='s1'
						color='var(--text-secondary)'
					/>
					<AuthButtons
						isSubmitted={isSubmitted}
						isValid={isValid}
						isSubmitting={isSubmitting}
						signUp={true}
					/>
				</Box>
			</Box>
		</Container>
	);
};
