import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const category1 = await prisma.category.create({
		data: {
			title: 'IT',
		},
	});

	const category2 = await prisma.category.create({
		data: {
			title: 'Информационные технологии',
		},
	});

	const format1 = await prisma.format.create({
		data: {
			formatName: 'онлайн',
			link: 'https://example.com/online',
			address: null,
		},
	});

	const format2 = await prisma.format.create({
		data: {
			formatName: 'офлайн',
			link: null,
			address: 'Москва, Улица Примерная, дом 1',
		},
	});

	// Обновляем создание пользователей согласно схеме
	const user1 = await prisma.user.create({
		data: {
			firstName: 'Томас',
			lastName: 'Шелби',
			email: 'admin1@example.com',
			hashedPassword: 'password',
			role: 'ADMIN',
		},
	});

	const user2 = await prisma.user.create({
		data: {
			firstName: 'Глеб',
			lastName: 'Дроздов',
			patronymic: 'Сергеевич',
			email: 'client1@example.com',
			hashedPassword: 'password',
			role: 'ADMIN',
		},
	});

	const event1 = await prisma.event.create({
		data: {
			title: 'Конференция по технологиям',
			startDate: new Date('2024-01-01T10:00:00Z'),
			endDate: new Date('2024-01-01T18:00:00Z'),
			formatId: format1.id,
			createdIdBy: user1.id,
			image: 'https://i.pinimg.com/564x/37/36/b6/3736b6a0fe310d5ceee25eb23cd98751.jpg',
			categories: {
				connect: { id: category1.id },
			},
		},
	});

	const event2 = await prisma.event.create({
		data: {
			title: 'Конференция по примерам',
			startDate: new Date('2024-01-01T10:00:00Z'),
			endDate: new Date('2024-01-01T18:00:00Z'),
			formatId: format2.id,
			createdIdBy: user1.id,
			image: 'https://i.pinimg.com/originals/da/53/92/da539274bffec447de9786d1c34ba476.jpg',
			categories: {
				connect: { id: category2.id },
			},
		},
	});

	console.log({
		categories: [category1, category2],
		formats: [format1, format2],
		users: [user1, user2],
		events: [event1, event2],
	});
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});