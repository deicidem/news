import { resolver } from '@blitzjs/rpc';
import db from 'db';

export default resolver.pipe(async () => {
	const formats = await db.format.findMany();
	return formats;
});
