import { Box } from '@mui/material';
import { BodyText, HeaderText } from '@/shared/components';
import s from './styled.module.scss';

type TDescriptionConfProps = {
	categoryTitle: string;
};

export const DescriptionConf = ({ categoryTitle }: TDescriptionConfProps) => {
	const shortDescription = [
		`• Выступления экспертов: Узнайте о последних исследованиях и инновациях от ведущих специалистов в области ${categoryTitle}.`,
		'• Панельные дискуссии: Участвуйте в обсуждениях на актуальные темы с участием экспертов и задавайте свои вопросы.',
		'• Сетевые возможности: Познакомьтесь с коллегами, единомышленниками и потенциальными партнёрами. Обменяйтесь идеями и наладьте полезные контакты.',
		'• Мастер-классы: Получите практические навыки и знания на специализированных сессиях от опытных практиков.',
	];

	return (
		<Box className={s.splitBlock}>
			<Box className={s.text}>
				<HeaderText
					text='В рамках конференции вас ожидает:'
					size='h1'
					color='var(--black-color)'
				/>
				<Box display='flex' flexDirection='column' gap='20px'>
					{shortDescription.map((item, index) => (
						<BodyText
							text={item}
							size='l'
							color={'var(--black-color)'}
							key={`${index}-text-1`}
						/>
					))}
				</Box>
			</Box>
			<Box color='black'>КАРТИНКААААААААА</Box>
		</Box>
	);
};
