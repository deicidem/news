import { setupBlitzServer as setupServer } from '@blitzjs/next';
import { AuthServerPlugin, PrismaStorage } from '@blitzjs/auth';
import { BlitzLogger } from 'blitz';
import { RpcServerPlugin } from '@blitzjs/rpc';
import db from '../../db';

export const {
	api,
	useAuthenticatedBlitzContext,
	invoke,
	getBlitzContext,
	withBlitzAuth,
	gSP,
	gSSP,
} = setupServer({
	plugins: [
		AuthServerPlugin({
			cookiePrefix: 'event_management_next',
			storage: PrismaStorage(db),
			isAuthorized: () => true,
		}),
		RpcServerPlugin({}),
	],
	logger: BlitzLogger({}),
});
