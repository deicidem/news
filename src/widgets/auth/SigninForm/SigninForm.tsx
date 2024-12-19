'use client';
import { SignUpFormValues } from '../SignupForm/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInFormSchema } from '@/shared/utils';
// import { userActions } from '../../../storage/slices/user';
// import { toast } from 'react-toastify';
// import { getMessageFromError } from '../../../utils/errorUtils';
import { Box, Container } from '@mui/material';
import { HeaderText } from '@/shared/components';
import { SIGN_UP_FORM_SETTINGS } from '@/shared/constants';
// import { useSignInMutation } from '../../../api/authApi';
import s from '../styles..module.scss';
import { AuthButtons } from '@/features/auth/components/authButtons';
import { AuthInputController } from '@/features/auth/components/authInputController';
import { useMutation } from '@blitzjs/rpc';
import login from '@/features/auth/api/mutations/login';
import { useRouter, useSearchParams } from 'next/navigation';
import { Route } from 'next';
import { AuthenticationError } from 'blitz';
import { FORM_ERROR } from '@/app/components/Form';
import { getAntiCSRFToken } from '@blitzjs/auth';
import { SignInFormValues } from '@/widgets/auth/SigninForm/types';

export const SignInForm = () => {
	//const dispatch = useDispatch();
	const router = useRouter();
	const [loginMutation] = useMutation(login);
	const next = useSearchParams()?.get('next');
	//const [signUpRequestFn] = useSignInMutation();
	const {
		control,
		handleSubmit,
		setError,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<SignUpFormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(signInFormSchema),
	});

	// const submitHandler: SubmitHandler<SignUpFormValues> = async (values) => {
	// 	//const antiCSRFToken = getAntiCSRFToken();
	// 	console.log(values);
	// 	try {
	// 		await loginMutation(values);
	// 		router.push('/');
	// 		console.log('GOOD!');
	// 		//router.refresh();
	//
	// 		if (next) {
	// 			router.push(next as Route);
	// 		} else {
	// 			router.push('/');
	// 		}
	// 	} catch (error: any) {
	// 		if (error instanceof AuthenticationError) {
	// 			return { [FORM_ERROR]: 'Sorry, those credentials are invalid' };
	// 		} else {
	// 			return {
	// 				[FORM_ERROR]:
	// 					'Sorry, we had an unexpected error. Please try again. - ' +
	// 					error.toString(),
	// 			};
	// 		}
	// 	}
	// 	// try {
	// 	// 	//const response = await signUpRequestFn(values).unwrap();
	// 	// 	// dispatch(userActions.setUser(response.user));
	// 	// 	// dispatch(
	// 	// 	// 	userActions.setAccessToken({ accessToken: response.accessToken })
	// 	// 	// );
	// 	// 	// toast.success('Вы успешно вошли в аккаунт!');
	// 	// 	//navigate('/');
	// 	// } catch (error) {
	// 	// 	console.log({ error });
	// 	// 	// toast.error(
	// 	// 	// 	getMessageFromError(
	// 	// 	// 		error,
	// 	// 	// 		'Не известная ошибка при авторизации пользователя'
	// 	// 	// 	)
	// 	// 	// );
	// 	// }
	// };

	const submitHandler: SubmitHandler<SignInFormValues> = async (values) => {
		try {
			console.log('Form values:', values);

			if (!values.email || !values.password) {
				throw new Error('Заполните email и пароль');
			}

			const loginData = {
				email: values.email,
				password: values.password,
			};

			console.log('Sending login data:', loginData);

			const user = await loginMutation(loginData);

			console.log('Login response:', user);

			if (user) {
				router.push('/');
			}
		} catch (error) {
			console.error('Login error:', error);

			if (error instanceof AuthenticationError) {
				setError('email', {
					type: 'manual',
					message: 'Неверный email или пароль',
				});
				setError('password', {
					type: 'manual',
					message: 'Неверный email или пароль',
				});
			} else {
				setError('email', {
					type: 'manual',
					message:
						error instanceof Error
							? error.message
							: 'Произошла ошибка при входе',
				});
			}
		}
	};
	return (
		<Container component='main' className={s.wrapper}>
			<Box className={s.wrapper_content}>
				<HeaderText text='Войти' size='h1' />
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
					<Box
						component='form'
						onSubmit={handleSubmit(submitHandler)}
						noValidate
						className={s.wrapper_form}>
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
						<AuthButtons
							isSubmitted={isSubmitted}
							isValid={isValid}
							isSubmitting={isSubmitting}
							signUp={false}
						/>
					</Box>
				</Box>
			</Box>
		</Container>
	);
};
