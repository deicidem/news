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
import { AuthButtons } from '@/features/authButtons';
import { AuthInputController } from '@/features/authInputController';
export const SignInForm = () => {
	const dispatch = useDispatch();

	//const [signUpRequestFn] = useSignInMutation();
	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<SignUpFormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(signInFormSchema),
	});

	const submitHandler: SubmitHandler<SignUpFormValues> = async (values) => {
		try {
			//const response = await signUpRequestFn(values).unwrap();
			// dispatch(userActions.setUser(response.user));
			// dispatch(
			// 	userActions.setAccessToken({ accessToken: response.accessToken })
			// );
			// toast.success('Вы успешно вошли в аккаунт!');
			//navigate('/');
		} catch (error) {
			console.log({ error });
			// toast.error(
			// 	getMessageFromError(
			// 		error,
			// 		'Не известная ошибка при авторизации пользователя'
			// 	)
			// );
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
