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

		await db.$transaction([
			db.event.update({
				where: { id },
				data: {
					categories: {
						disconnect: event.categories.map((cat) => ({ id: cat.id })),
					},
				},
			}),

			db.event.update({
				where: { id },
				data: {
					authors: {
						disconnect: event.authors.map((author) => ({ id: author.id })),
					},
				},
			}),

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

			db.event.delete({
				where: { id },
			}),

			db.format.delete({
				where: { id: event.formatId },
			}),
		]);

		return event;
	}
);
