import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { Ctx } from 'blitz';

export default resolver.pipe(async (_ = null, ctx: Ctx) => {
	if (!ctx.session.userId) throw new Error('Not authenticated');

	const events = await db.event.findMany({
		where: {
			OR: [
				{ createdIdBy: ctx.session.userId },
				{ authors: { some: { id: ctx.session.userId } } },
			],
		},
		include: {
			format: true,
			categories: true,
			createdBy: true,
			authors: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return events;
});
