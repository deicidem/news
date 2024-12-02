'use client';
import { useDispatch } from 'react-redux';
// import { useSignUpMutation } from '../../../api/authApi';
import { SignUpFormValues } from './types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpFormSchema } from '@/shared/utils';
// import { userActions } from '../../../storage/slices/user';
// import { toast } from 'react-toastify';
// import { getMessageFromError } from '../../../utils/errorUtils';
import { Box, Container } from '@mui/material';
import { SIGN_UP_FORM_SETTINGS } from '@/shared/constants';
import { BodyText, HeaderText } from '@/shared/components';
import s from '../styles..module.scss';
import { AuthButtons } from '@/features/authButtons';
import { AuthInputController } from '@/features/authInputController';

export const SignUpForm = () => {
	const dispatch = useDispatch();

	//const [signUpRequestFn] = useSignUpMutation();
	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting, isSubmitted },
	} = useForm<SignUpFormValues>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(signUpFormSchema),
	});

	const submitHandler: SubmitHandler<SignUpFormValues> = async (values) => {
		try {
			//const response = await signUpRequestFn(values).unwrap();
			// dispatch(userActions.setUser(response.user));
			// dispatch(
			// 	userActions.setAccessToken({ accessToken: response.accessToken })
			// );
			// toast.success('Вы успешно зарегистрированы!');
			//navigate('/signIn');
		} catch (error) {
			console.log({ error });
			// toast.error(
			// 	getMessageFromError(
			// 		error,
			// 		'Не известная ошибка при регистрации пользователя'
			// 	)
			// );
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
					<BodyText
						text='Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности	и соглашаетесь на информационную рассылку.'
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
