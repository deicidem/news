import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';

const GetEventById = z.object({
	id: z.string(),
});

export default resolver.pipe(
	resolver.zod(GetEventById),
	resolver.authorize(),
	async ({ id }, ctx) => {
		const userId = ctx.session.userId;
		if (!userId) throw new Error('Not authenticated');

		const event = await db.event.findUnique({
			where: {
				id,
				OR: [{ createdIdBy: userId }, { authors: { some: { id: userId } } }],
			},
			include: {
				format: true,
				categories: true,
				authors: true,
				participants: true,
				createdBy: true,
			},
		});

		if (!event) {
			throw new Error('Event not found or you are not authorized to view it');
		}

		return event;
	}
);
