import s from './styled.module.scss';
import { Box } from '@mui/material';
import { BodyText, HeaderText } from '@/shared/components';
import { EventsIcon } from '@/shared/icons';
export const BottomDescription = () => {
	const dataText = [
		{ count: '2', text: 'дня' },
		{ count: '9', text: 'секций' },
		{ count: '1001', text: 'участник' },
		{ count: '42', text: 'топовых доклада' },
	];

	const dataCard = [
		{ icon: <EventsIcon />, text: 'Звёзды отрасли' },
		{ icon: <EventsIcon />, text: 'Масштабный нетворкинг' },
		{ icon: <EventsIcon />, text: 'Жаркие дебаты' },
		{ icon: <EventsIcon />, text: 'Топовый митап' },
	];

	return (
		<Box className={s.wrapper}>
			<Box className={s.container}>
				{dataText.map((item, index) => (
					<Box className={s.container_textBlock} key={`${index}-card`}>
						<HeaderText text={item.count} size='h0' />
						<BodyText text={item.text} size='l' />
					</Box>
				))}
			</Box>
			<Box className={s.container}>
				{dataCard.map((item, index) => (
					<Box className={s.cardBlock} key={`${index}-card`}>
						<HeaderText text={item.text} size='h1' color='var(--black-color)' />
						<Box className={s.cardBlock_icon}>{item.icon}</Box>
					</Box>
				))}
			</Box>
		</Box>
	);
};
