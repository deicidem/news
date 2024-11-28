import { BodyText, HeaderText } from '@/shared/components';
import { Box } from '@mui/material';
import s from './styled.module.scss';

type TAboutConfProps = {
	categories?: ICategory[];
};

const staticText = [
	'Сильная программа на базе глубинных исследований рынка.',
	'Мы не просто проводим конференцию — мы создаём пространство для общения.',
	'Доклады с реальными кейсами и глубоким анализом актуальных задач.',
	'Фокус на опыте и практиках, а не пустая болтовня.',
];

export const AboutConf = ({ categories }: TAboutConfProps) => {
	return (
		<Box className={s.aboutBlock}>
			<HeaderText
				text={'О конференции '}
				size='h1'
				color='var(--black-color)'
			/>
			{categories && (
				<Box className={s.categories}>
					{categories.map((item, index) => (
						<Box className={s.categories_elem} key={`${index}-category`}>
							<HeaderText text={`#${item.title}`} size='h1' />
						</Box>
					))}
				</Box>
			)}
			<Box className={s.cards}>
				{staticText.map((item, index) => (
					<Box className={s.cards_elem} key={`${index}-card`}>
						<HeaderText text={`0${index + 1}`} size='h1' />
						<BodyText text={item} size='l' fontWeight='600' />
					</Box>
				))}
			</Box>
		</Box>
	);
};
