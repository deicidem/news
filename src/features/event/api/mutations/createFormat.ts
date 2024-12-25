import { resolver } from '@blitzjs/rpc';
import db from 'db';
import { z } from 'zod';

const CreateFormat = z
	.object({
		formatType: z.enum(['онлайн', 'офлайн', 'гибрид']),
		link: z.string().optional(),
		address: z.string().optional(),
	})
	.refine(
		(data) => {
			if (data.formatType === 'онлайн' && !data.link) {
				return false;
			}
			if (data.formatType === 'офлайн' && !data.address) {
				return false;
			}
			if (data.formatType === 'гибрид' && (!data.link || !data.address)) {
				return false;
			}
			return true;
		},
		{
			message: 'Неправильная комбинация полей для выбранного типа формата',
		}
	);

export default resolver.pipe(resolver.zod(CreateFormat), async (input) => {
	const format = await db.format.create({
		data: input,
	});
	return format;
});
