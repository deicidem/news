import { resolver } from '@blitzjs/rpc';
import db from 'db';

export default resolver.pipe(async (searchEmail: string) => {
	if (searchEmail.length < 2) return [];

	const admins = await db.user.findMany({
		where: {
			AND: [
				{ role: 'ADMIN' },
				{ email: { contains: searchEmail.toLowerCase() } },
			],
		},
		select: {
			id: true,
			email: true,
			firstName: true,
			lastName: true,
		},
	});

	return admins;
});
