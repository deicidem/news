import { IEvent } from '@/entities/event';

export const eventsMocks: IEvent[] = [
	{
		id: '1-jvdbkbgodrhpv',
		createdIdBy: '123',
		createdAt: new Date('2023-04-01T12:00:00.000Z'),
		updatedAt: new Date('2023-04-05T15:30:00.000Z'),
		updatedBy: '456',
		title: 'React Conference 2023',
		startDate: new Date('2023-06-01T09:00:00.000Z'),
		endDate: new Date('2023-06-03T17:00:00.000Z'),
		formatId: 'format1',
		format: {
			id: 'format1',
			formatName: 'онлайн',
			link: 'https://example.com/react-conference-2023',
		},
		description: 'A conference dedicated to the latest advancements in React.',
		image:
			'https://i.pinimg.com/564x/37/36/b6/3736b6a0fe310d5ceee25eb23cd98751.jpg',
		categories: [
			{ id: 'cat1', title: 'frontend' },
			{ id: 'cat2', title: 'javascript' },
			{ id: 'cat3', title: 'react' },
		],
	},
	{
		id: '2-hnltbhrp',
		createdIdBy: '789',
		createdAt: new Date('2023-03-15T10:30:00.000Z'),
		updatedAt: new Date('2023-04-10T14:00:00.000Z'),
		updatedBy: '012',
		title: 'AI and Machine Learning Conference',
		startDate: new Date('2023-09-01T10:00:00.000Z'),
		endDate: new Date('2023-09-03T18:00:00.000Z'),
		formatId: 'format2',
		format: {
			id: 'format2',
			formatName: 'офлайн',
			address: '123 Main St, Anytown Russia',
		},
		description:
			'Exploring the latest advancements in artificial intelligence and machine learning.',
		image:
			'https://i.pinimg.com/originals/da/53/92/da539274bffec447de9786d1c34ba476.jpg',
		categories: [
			{ id: 'cat4', title: 'ai' },
			{ id: 'cat5', title: 'machine-learning' },
			{ id: 'cat6', title: 'technology' },
		],
	},
	{
		id: '3-mknbugbo',
		createdIdBy: '345',
		createdAt: new Date('2023-02-20T14:15:00.000Z'),
		updatedAt: new Date('2023-04-15T11:45:00.000Z'),
		updatedBy: '678',
		title: 'DevOps Summit',
		startDate: new Date('2023-11-01T08:30:00.000Z'),
		endDate: new Date('2023-11-02T16:30:00.000Z'),
		formatId: 'format3',
		format: {
			id: 'format3',
			formatName: 'гибрид',
			address: '4536 Main St, NKgsp Russia',
		},
		description: 'Bridging the gap between development and operations.',
		image:
			'https://i.pinimg.com/originals/da/53/92/da539274bffec447de9786d1c34ba476.jpg',
		categories: [
			{ id: 'cat7', title: 'devops' },
			{ id: 'cat8', title: 'engineering' },
			{ id: 'cat9', title: 'automation' },
		],
	},
	{
		id: '4',
		createdIdBy: '345',
		createdAt: new Date('2023-02-20T14:15:00.000Z'),
		updatedAt: new Date('2023-04-15T11:45:00.000Z'),
		updatedBy: '678',
		title: 'DevOps Summit',
		startDate: new Date('2023-11-01T08:30:00.000Z'),
		endDate: new Date('2023-11-02T16:30:00.000Z'),
		formatId: 'format1',
		format: {
			id: 'format1',
			formatName: 'гибрид',
			link: 'https://example.com/react-conference-2023',
			address: '4536 Main St, NKgsp Russia',
		},
		description: 'Bridging the gap between development and operations.',
		image:
			'https://i.pinimg.com/originals/da/53/92/da539274bffec447de9786d1c34ba476.jpg',
		categories: [
			{ id: 'cat1', title: 'devops' },
			{ id: 'cat2', title: 'engineering' },
			{ id: 'cat3', title: 'automation' },
		],
	},
	{
		id: '5',
		createdIdBy: '123',
		createdAt: new Date('2023-04-01T12:00:00.000Z'),
		updatedAt: new Date('2023-04-05T15:30:00.000Z'),
		updatedBy: '456',
		title: 'React Conference 2023',
		startDate: new Date('2023-06-01T09:00:00.000Z'),
		endDate: new Date('2023-06-03T17:00:00.000Z'),
		formatId: 'format2',
		format: {
			id: 'format2',
			formatName: 'гибрид',
			link: 'https://example.com/react-conference-2023',
			address: '4536 Main St, NKgsp Russia',
		},
		description: 'A conference dedicated to the latest advancements in React.',
		image:
			'https://i.pinimg.com/564x/37/36/b6/3736b6a0fe310d5ceee25eb23cd98751.jpg',
		categories: [
			{ id: 'cat4', title: 'frontend' },
			{ id: 'cat5', title: 'javascript' },
			{ id: 'cat6', title: 'react' },
		],
	},
	{
		id: '6',
		createdIdBy: '789',
		createdAt: new Date('2023-04-20T09:00:00.000Z'),
		updatedAt: new Date('2023-04-22T12:00:00.000Z'),
		updatedBy: '345',
		title: 'Web Development Bootcamp',
		startDate: new Date('2023-07-01T09:00:00.000Z'),
		endDate: new Date('2023-07-15T17:00:00.000Z'),
		formatId: 'format3',
		format: {
			id: 'format3',
			formatName: 'гибрид',
			link: 'https://example.com/web-development-bootcamp',
			address: '4536 Main St, NKgsp Russia',
		},
		description: 'An intensive 2-week bootcamp for aspiring web developers.',
		image:
			'https://i.pinimg.com/564x/37/36/b6/3736b6a0fe310d5ceee25eb23cd98751.jpg',
		categories: [
			{ id: 'cat7', title: 'frontend' },
			{ id: 'cat8', title: 'backend' },
			{ id: 'cat9', title: 'web-development' },
		],
	},
	{
		id: '7',
		createdIdBy: '012',
		createdAt: new Date('2023-05-01T14:30:00.000Z'),
		updatedAt: new Date('2023-05-05T16:45:00.000Z'),
		updatedBy: '789',
		title: 'Blockchain Technology Summit',
		startDate: new Date('2023-10-10T10:00:00.000Z'),
		endDate: new Date('2023-10-12T18:00:00.000Z'),
		formatId: 'format4',
		format: {
			id: 'format4',
			formatName: 'гибрид',
			address: '4536 Main St, NKgsp Russia',
		},
		description: 'Exploring the latest advancements in blockchain technology.',
		image:
			'https://i.pinimg.com/originals/da/53/92/da539274bffec447de9786d1c34ba476.jpg',
		categories: [
			{ id: 'cat10', title: 'blockchain' },
			{ id: 'cat11', title: 'cryptocurrency' },
			{ id: 'cat12', title: 'technology' },
		],
	},
	{
		id: '8',
		createdIdBy: '678',
		createdAt: new Date('2023-06-01T11:00:00.000Z'),
		updatedAt: new Date('2023-06-10T13:30:00.000Z'),
		updatedBy: '345',
		title: 'UI/UX Design Conference',
		startDate: new Date('2023-08-15T09:00:00.000Z'),
		endDate: new Date('2023-08-16T17:00:00.000Z'),
		formatId: 'format5',
		format: {
			id: 'format5',
			formatName: 'гибрид',
			address: '4536 Main St, NKgsp Russia',
		},
		description:
			'Exploring the latest trends and best practices in user interface and user experience design.',
		image:
			'https://i.pinimg.com/564x/37/36/b6/3736b6a0fe310d5ceee25eb23cd98751.jpg',
		categories: [
			{ id: 'cat13', title: 'design' },
			{ id: 'cat14', title: 'ux' },
			{ id: 'cat15', title: 'ui' },
		],
	},
	{
		id: '9',
		createdIdBy: '123',
		createdAt: new Date('2023-07-01T15:30:00.000Z'),
		updatedAt: new Date('2023-07-15T18:00:00.000Z'),
		updatedBy: '456',
		title: 'Cybersecurity Awareness Conference',
		startDate: new Date('2023-11-20T09:00:00.000Z'),
		endDate: new Date('2023-11-21T17:00:00.000Z'),
		formatId: 'format6',
		format: {
			id: 'format6',
			formatName: 'гибрид',
			address: '4536 Main St, NKgsp Russia',
		},
		description:
			'Educating professionals on the latest cybersecurity threats and best practices.',
		image:
			'https://i.pinimg.com/originals/da/53/92/da539274bffec447de9786d1c34ba476.jpg',
		categories: [
			{ id: 'cat16', title: 'cybersecurity' },
			{ id: 'cat17', title: 'security' },
			{ id: 'cat18', title: 'technology' },
		],
	},
	{
		id: '10',
		createdIdBy: '789',
		createdAt: new Date('2023-08-01T14:00:00.000Z'),
		updatedAt: new Date('2023-08-10T16:30:00.000Z'),
		updatedBy: '012',
		title: 'Data Science and Analytics Conference',
		startDate: new Date('2023-12-05T09:00:00.000Z'),
		endDate: new Date('2023-12-07T17:00:00.000Z'),
		formatId: 'format7',
		format: {
			id: 'format7',
			formatName: 'гибрид',
			address: '4536 Main St, NKgsp Russia',
		},
		description:
			'Exploring the latest advancements in data science, analytics, and big data.',
		image:
			'https://i.pinimg.com/564x/37/36/b6/3736b6a0fe310d5ceee25eb23cd98751.jpg',
		categories: [
			{ id: 'cat19', title: 'data-science' },
			{ id: 'cat20', title: 'analytics' },
			{ id: 'cat21', title: 'big-data' },
		],
	},
	{
		id: '11',
		createdIdBy: '123',
		createdAt: new Date('2023-04-01T12:00:00.000Z'),
		updatedAt: new Date('2023-04-05T15:30:00.000Z'),
		updatedBy: '456',
		title: 'React Conference 2023',
		startDate: new Date('2023-06-01T09:00:00.000Z'),
		endDate: new Date('2023-06-03T17:00:00.000Z'),
		formatId: 'format1',
		format: {
			id: 'format1',
			formatName: 'онлайн',
			link: 'https://example.com/react-conference-2023',
		},
		description: 'A conference dedicated to the latest advancements in React.',
		image:
			'https://i.pinimg.com/564x/37/36/b6/3736b6a0fe310d5ceee25eb23cd98751.jpg',
		categories: [
			{ id: 'cat1', title: 'frontend' },
			{ id: 'cat2', title: 'javascript' },
			{ id: 'cat3', title: 'react' },
		],
	},
	{
		id: '12',
		createdIdBy: '789',
		createdAt: new Date('2023-03-15T10:30:00.000Z'),
		updatedAt: new Date('2023-04-10T14:00:00.000Z'),
		updatedBy: '012',
		title: 'AI and Machine Learning Conference',
		startDate: new Date('2023-09-01T10:00:00.000Z'),
		endDate: new Date('2023-09-03T18:00:00.000Z'),
		formatId: 'format2',
		format: {
			id: 'format2',
			formatName: 'офлайн',
			address: '123 Main St, Anytown Russia',
		},
		description:
			'Exploring the latest advancements in artificial intelligence and machine learning.',
		image:
			'https://i.pinimg.com/originals/da/53/92/da539274bffec447de9786d1c34ba476.jpg',
		categories: [
			{ id: 'cat4', title: 'ai' },
			{ id: 'cat5', title: 'machine-learning' },
			{ id: 'cat6', title: 'technology' },
		],
	},
	{
		id: '13',
		createdIdBy: '345',
		createdAt: new Date('2023-02-20T14:15:00.000Z'),
		updatedAt: new Date('2023-04-15T11:45:00.000Z'),
		updatedBy: '678',
		title: 'DevOps Summit',
		startDate: new Date('2023-11-01T08:30:00.000Z'),
		endDate: new Date('2023-11-02T16:30:00.000Z'),
		formatId: 'format3',
		format: {
			id: 'format3',
			formatName: 'гибрид',
			link: 'https://example.com/devops-summit',
			address: '4536 Main St, NKgsp Russia',
		},
		description: 'Bridging the gap between development and operations.',
		image:
			'https://i.pinimg.com/originals/da/53/92/da539274bffec447de9786d1c34ba476.jpg',
		categories: [
			{ id: 'cat7', title: 'devops' },
			{ id: 'cat8', title: 'engineering' },
			{ id: 'cat9', title: 'automation' },
		],
	},
	{
		id: '14',
		createdIdBy: '345',
		createdAt: new Date('2023-02-20T14:15:00.000Z'),
		updatedAt: new Date('2023-04-15T11:45:00.000Z'),
		updatedBy: '678',
		title: 'DevOps Summit (Duplicate)',
		startDate: new Date('2023-11-01T08:30:00.000Z'),
		endDate: new Date('2023-11-02T16:30:00.000Z'),
		formatId: 'format4',
		format: {
			id: 'format4',
			formatName: 'гибрид',
			address: '4536 Main St, NKgsp Russia',
		},
		description: 'Bridging the gap between development and operations.',
		image:
			'https://i.pinimg.com/originals/da/53/92/da539274bffec447de9786d1c34ba476.jpg',
		categories: [
			{ id: 'cat10', title: 'devops' },
			{ id: 'cat11', title: 'engineering' },
			{ id: 'cat12', title: 'automation' },
		],
	},
	{
		id: '15',
		createdIdBy: '123',
		createdAt: new Date('2023-04-01T12:00:00.000Z'),
		updatedAt: new Date('2023-04-05T15:30:00.000Z'),
		updatedBy: '456',
		title: 'React Conference 2023 (Duplicate)',
		startDate: new Date('2023-06-01T09:00:00.000Z'),
		endDate: new Date('2023-06-03T17:00:00.000Z'),
		formatId: 'format5',
		format: {
			id: 'format5',
			formatName: 'гибрид',
			address: '4536 Main St, NKgsp Russia',
		},
		description: 'A conference dedicated to the latest advancements in React.',
		image:
			'https://i.pinimg.com/564x/37/36/b6/3736b6a0fe310d5ceee25eb23cd98751.jpg',
		categories: [
			{ id: 'cat13', title: 'frontend' },
			{ id: 'cat14', title: 'javascript' },
			{ id: 'cat15', title: 'react' },
		],
	},
	{
		id: '16',
		createdIdBy: '789',
		createdAt: new Date('2023-04-20T09:00:00.000Z'),
		updatedAt: new Date('2023-04-22T12:00:00.000Z'),
		updatedBy: '345',
		title: 'Web Development Bootcamp',
		startDate: new Date('2023-07-01T09:00:00.000Z'),
		endDate: new Date('2023-07-15T17:00:00.000Z'),
		formatId: 'format6',
		format: {
			id: 'format6',
			formatName: 'гибрид',
			address: '4536 Main St, NKgsp Russia',
		},
		description: 'An intensive 2-week bootcamp for aspiring web developers.',
		image:
			'https://i.pinimg.com/564x/37/36/b6/3736b6a0fe310d5ceee25eb23cd98751.jpg',
		categories: [
			{ id: 'cat16', title: 'frontend' },
			{ id: 'cat17', title: 'backend' },
			{ id: 'cat18', title: 'web-development' },
		],
	},
	{
		id: '17',
		createdIdBy: '012',
		createdAt: new Date('2023-05-01T14:30:00.000Z'),
		updatedAt: new Date('2023-05-05T16:45:00.000Z'),
		updatedBy: '789',
		title: 'Blockchain Technology Summit',
		startDate: new Date('2023-10-10T10:00:00.000Z'),
		endDate: new Date('2023-10-12T18:00:00.000Z'),
		formatId: 'format7',
		format: {
			id: 'format7',
			formatName: 'гибрид',
			address: '4536 Main St, NKgsp Russia',
		},
		description: 'Exploring the latest advancements in blockchain technology.',
		image:
			'https://i.pinimg.com/originals/da/53/92/da539274bffec447de9786d1c34ba476.jpg',
		categories: [
			{ id: 'cat19', title: 'blockchain' },
			{ id: 'cat20', title: 'cryptocurrency' },
			{ id: 'cat21', title: 'technology' },
		],
	},
	{
		id: '18',
		createdIdBy: '678',
		createdAt: new Date('2023-06-01T11:00:00.000Z'),
		updatedAt: new Date('2023-06-10T13:30:00.000Z'),
		updatedBy: '345',
		title: 'UI/UX Design Conference',
		startDate: new Date('2023-08-15T09:00:00.000Z'),
		endDate: new Date('2023-08-16T17:00:00.000Z'),
		formatId: 'format8',
		format: {
			id: 'format8',
			formatName: 'гибрид',
			address: '4536 Main St, NKgsp Russia',
		},
		description:
			'Exploring the latest trends and best practices in user interface and user experience design.',
		image:
			'https://i.pinimg.com/564x/37/36/b6/3736b6a0fe310d5ceee25eb23cd98751.jpg',
		categories: [
			{ id: 'cat22', title: 'design' },
			{ id: 'cat23', title: 'ux' },
			{ id: 'cat24', title: 'ui' },
		],
	},
	{
		id: '19',
		createdIdBy: '123',
		createdAt: new Date('2023-07-01T15:30:00.000Z'),
		updatedAt: new Date('2023-07-15T18:00:00.000Z'),
		updatedBy: '456',
		title: 'Cybersecurity Awareness Conference',
		startDate: new Date('2023-11-20T09:00:00.000Z'),
		endDate: new Date('2023-11-21T17;00;00.000Z'),
		formatId: 'format9',
		format: {
			id: 'format9',
			formatName: 'гибрид',
			address: '4536 Main St, NKgsp Russia',
		},
		description:
			'Educating professionals on the latest cybersecurity threats and best practices.',
		image:
			'https://i.pinimg.com/originals/da/53/92/da539274bffec447de9786d1c34ba476.jpg',
		categories: [
			{ id: 'cat25', title: 'cybersecurity' },
			{ id: 'cat26', title: 'security' },
			{ id: 'cat27', title: 'technology' },
		],
	},
	{
		id: '110',
		createdIdBy: '789',
		createdAt: new Date('2023 -08 -01 T14 : 0 0 : 0 . 0 Z'),
		updatedAt: new Date('2 023 -08 -10 T16 :30 :0 0 .0 Z'),
		updatedBy: '012',
		title: 'Data Science and Analytics Conference',
		startDate: new Date('2 023 -12 -05 T09 :0 0 :0 .0 Z'),
		endDate: new Date('2 023 -12 -07 T17 :0 0 :0 .0 Z'),
		formatId: 'format10',
		format: {
			id: 'format10',
			formatName: 'гибрид',
			address: '4536 Main St, NKgsp Russia',
		},
		description:
			'Exploring the latest advancements in data science, analytics, and big data.',
		image:
			'https://i.pinimg.com/originals/564x37 /36/b6 /3736b6a0fe310d5ceee25eb23cd98751.jpg',
		categories: [
			{ id: 'cat28', title: 'data-science' },
			{ id: 'cat29', title: 'analytics' },
			{ id: 'cat30', title: 'big-data' },
		],
	},
];
