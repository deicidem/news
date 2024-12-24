import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';

const DeleteEvent = z.object({
	id: z.string(),
});

export default resolver.pipe(
	resolver.zod(DeleteEvent),
	resolver.authorize(),
	async ({ id }, ctx) => {
		const userId = ctx.session.userId;
		if (!userId) throw new Error('Not authenticated');

		// Находим событие со всеми связями
		const event = await db.event.findUnique({
			where: {
				id,
				OR: [{ createdIdBy: userId }, { authors: { some: { id: userId } } }],
			},
			include: {
				categories: true,
				authors: true,
				participants: true,
				format: true,
			},
		});

		if (!event) {
			throw new Error('Event not found or you are not authorized to delete it');
		}

		// Удаляем связанные записи в промежуточных таблицах
		await db.$transaction([
			// Удаление связей с категориями
			db.event.update({
				where: { id },
				data: {
					categories: {
						disconnect: event.categories.map((cat) => ({ id: cat.id })),
					},
				},
			}),

			// Удаление связей с авторами
			db.event.update({
				where: { id },
				data: {
					authors: {
						disconnect: event.authors.map((author) => ({ id: author.id })),
					},
				},
			}),

			// Удаление связей с участниками
			db.event.update({
				where: { id },
				data: {
					participants: {
						disconnect: event.participants.map((participant) => ({
							id: participant.id,
						})),
					},
				},
			}),

			// Удаление самого события
			db.event.delete({
				where: { id },
			}),

			// Удаление связанного формата
			db.format.delete({
				where: { id: event.formatId },
			}),
		]);

		return event;
	}
);
