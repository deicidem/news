import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';

const CreateEvent = z.object({
	title: z.string().min(1),
	startDate: z.date(),
	endDate: z.date(),
	formatType: z.enum(['online', 'offline', 'hybrid']),
	link: z.string().optional(),
	address: z.string().optional(),
	description: z.string().optional(),
	image: z.string(),
	categoryIds: z.array(z.string()),
	authorIds: z.array(z.string()),
});

export default resolver.pipe(
	resolver.zod(CreateEvent),
	resolver.authorize(),
	async (input, ctx) => {
		const userId = ctx.session.userId;
		if (!userId) throw new Error('Not authenticated');

		const authors = await db.user.findMany({
			where: {
				id: { in: input.authorIds },
				role: 'ADMIN',
			},
		});

		if (authors.length !== input.authorIds.length) {
			throw new Error('Some of the selected authors are not administrators');
		}

		const format = await db.format.create({
			data: {
				formatName: input.formatType,
				link: input.link,
				address: input.address,
			},
		});

		const event = await db.event.create({
			data: {
				title: input.title,
				startDate: input.startDate,
				endDate: input.endDate,
				formatId: format.id,
				description: input.description,
				image: input.image,
				createdIdBy: ctx.session.userId,
				categories: {
					connect: input.categoryIds.map((id) => ({ id })),
				},
				authors: {
					connect: authors.map((author) => ({ id: author.id })),
				},
			},
			include: {
				format: true,
				categories: true,
				createdBy: true,
				authors: true,
			},
		});

		return event;
	}
);
