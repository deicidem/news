import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { Button } from '@/shared/components';

type TAuthButtonsProps = {
	isSubmitted: boolean;
	isValid: boolean;
	isSubmitting: boolean;
	signUp?: boolean;
};

export const AuthButtons = ({
	isSubmitted,
	isValid,
	isSubmitting,
	signUp = false,
}: TAuthButtonsProps) => {
	const router = useRouter();

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
			<Button
				view='primary'
				disabled={isSubmitted && (!isValid || isSubmitting)}
				label={signUp ? 'Зарегистрироваться' : 'Войти'}
				type='submit'
			/>
			<Button
				view='outlined-on-dark'
				label={signUp ? 'Уже есть аккаунт? Войти' : 'Регистрация'}
				onClick={() => router.push(signUp ? '/login' : '/signup')}
			/>
		</Box>
	);
};
