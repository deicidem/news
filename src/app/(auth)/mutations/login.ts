import { resolver } from '@blitzjs/rpc';
import { AuthenticationError } from 'blitz';
import db from '../../../../db';
import type { Role } from '../../../../types';
import publicMiddleware from '@/app/(auth)/middleware/publicMiddleware';
import { z } from 'zod';

const Input = z.object({
	email: z.string().email(),
	password: z.string(),
});

export default resolver.pipe(
	async (input: { email: string; password: string }, ctx) => {
		console.log('Received input:', input);

		if (!input?.email) {
			console.log('No email provided');
			throw new Error('Email is required');
		}

		// Ищем пользователя по email
		const user = await db.user.findFirst({
			where: {
				email: input.email,
			},
		});

		console.log('Found user:', user ? 'Yes' : 'No');

		if (!user) {
			throw new AuthenticationError('Пользователь не найден');
		}

		// Простая проверка пароля
		if (user.hashedPassword !== input.password) {
			throw new AuthenticationError('Неверный пароль');
		}

		// Создаем сессию
		await ctx.session.$create({
			userId: user.id,
			role: user.role as Role,
		});

		// Возвращаем пользователя без пароля
		const { hashedPassword, ...userWithoutPassword } = user;
		return userWithoutPassword;
	}
);
