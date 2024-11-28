import { Box } from '@mui/material';
import { eventsMocks } from '@/shared/api/mocks';
import { IEvent } from '@/entities/event';
import { BodyText, HeaderText } from '@/shared/components';
import s from './styles.module.scss';

export const findEventById = (events: IEvent[], id: string) => {
	return events.find((event) => event.id === id);
};

type TEventDetailProps = {
	idEvent: string;
};

export const EventDetail = ({ idEvent }: TEventDetailProps) => {
	const event = findEventById(eventsMocks, idEvent);

	const shortDescription = [
		`• Выступления экспертов: Узнайте о последних исследованиях и инновациях от ведущих специалистов в области ${event?.categories[0].title}.`,
		'• Панельные дискуссии: Участвуйте в обсуждениях на актуальные темы с участием экспертов и задавайте свои вопросы.',
		'• Сетевые возможности: Познакомьтесь с коллегами, единомышленниками и потенциальными партнёрами. Обменяйтесь идеями и наладьте полезные контакты.',
		'• Мастер-классы: Получите практические навыки и знания на специализированных сессиях от опытных практиков.',
	];

	const textTitle = [
		`Присоединяйтесь к нам на конференции ${event?.title}!`,
		'Это уникальная возможность для educators, исследователей, студентов и всех, кто заинтересован в будущем образования, собраться вместе, поделиться идеями и обсудить последние тренды и технологии, которые меняют образовательный ландшафт.',
	];

	const enumeration = [
		'КАТЕГОРИЯ 1',
		'КАТЕГОРИЯ 2',
		'Суть поняла',
		'gdgd',
		'gmjeugihespofpn eifhsifhp;fnspei',
	];

	return (
		<Box className={s.wrapper}>
			<Box
				className={s.wrapper_block}
				sx={{ background: 'var(--white-color)' }}>
				<Box className={s.wrapper_block_text} alignItems='center'>
					<BodyText
						text={textTitle[0]}
						size='l'
						color={'var(--accent-color)'}
						fontWeight='900'
					/>
					<BodyText
						text={textTitle[1]}
						size='l'
						color={'var(--black-color)'}
						fontWeight='600'
					/>
				</Box>
			</Box>
			<Box className={s.wrapper_block}>
				AAAAAAAAAAAAAAAAAИМАЦИЯ КАКАЯ_НИБУДЬ УУУУУУУУУУУ
			</Box>
			<Box
				className={s.wrapper_block}
				sx={{
					background: 'var(--white-color)',
					justifyContent: 'space-between',
				}}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}>
					<Box className={s.wrapper_block_text} width='70%'>
						<BodyText
							text='В рамках конференции вас ожидает:'
							size='l'
							fontWeight='600'
							color={'var(--accent-color)'}
						/>
						{shortDescription.map((item, index) => (
							<BodyText
								text={item}
								size='l'
								color={'var(--black-color)'}
								key={`${index}-text-1`}
							/>
						))}
					</Box>
					<Box color='black'>КАРТИНКААААААААА</Box>
				</Box>
			</Box>
			<Box className={s.wrapper_block} flexDirection='column'>
				<HeaderText text={'О конференции '} size='h1' />
				<Box className={s.wrapper_enumeration}>
					{enumeration.map((item, index) => (
						<BodyText
							text={item}
							size='l'
							color={'var(--black-color)'}
							key={`${index}-text-2`}
						/>
					))}
				</Box>
				<Box className={s.wrapper_block_text}>
					<BodyText
						text='Регистрация:'
						size='l'
						fontWeight='600'
						color={'var(--white-color)'}
					/>
					<BodyText
						text={
							'Не упустите шанс стать частью этого значимого события! Зарегистрируйтесь до 3-х дней до окончания регистрации' +
							'на этой странице. Количество мест ограничено!'
						}
						size='l'
						color={'var(--white-color)'}
					/>
				</Box>
			</Box>

			<Box
				className={s.wrapper_block}
				sx={{ background: 'var(--white-color)' }}>
				<Box display='flex' flexDirection='column' gap='8px'></Box>
			</Box>
			<Box display='flex' flexDirection='column' gap='24px' sx={{}}></Box>
			<Box className={s.wrapper_block_text}></Box>
		</Box>
	);
};
