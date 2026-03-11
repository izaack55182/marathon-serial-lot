import { type Context } from 'hono'
import { getClientEnv, getServerEnv, initEnv } from '@/utils/env.server'

export const getLoadContext = async (c: Context) => {
	// initialize the server environment with Cloudflare env
	const env = initEnv(c.env)

	return {
		isProductionDeployment: env.APP_ENV === 'production',
		env,
		clientEnv: getClientEnv(),
		// We do not add this to AppLoadContext type because it's not needed in the loaders, but it's used above to handle requests
		body: c.body,
	}
}

interface LoadContext extends Awaited<ReturnType<typeof getLoadContext>> { }

/**
 * Declare our loaders and actions context type
 */
declare module 'react-router' {
	interface AppLoadContext extends Omit<LoadContext, 'body'> { }
}
