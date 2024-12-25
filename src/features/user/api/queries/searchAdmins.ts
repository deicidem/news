import { resolver } from '@blitzjs/rpc';
import db from 'db';

type SearchParams = {
	searchValue: string;
	searchField: 'email' | 'id';
};
export default resolver.pipe(
	async ({ searchValue, searchField }: SearchParams) => {
		if (searchValue.length < 2) return [];

		const whereClause = {
			role: 'ADMIN',
		};
		switch (searchField) {
			case 'email':
				whereClause.email = { contains: searchValue.toLowerCase() };
				break;
			case 'id':
				whereClause.id = { contains: searchValue };
				break;
			default:
				throw new Error('Invalid search field');
		}

		const admins = await db.user.findMany({
			where: whereClause,
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
			},
		});

		return admins;
	}
);
