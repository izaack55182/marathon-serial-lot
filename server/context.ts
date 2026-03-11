import { type Context } from 'hono'
import { getClientEnv, getServerEnv, initEnv } from '@/utils/env.server'

export const getLoadContext = async (c: Context) => {
	const env = initEnv(c.env)

	return {
		isProductionDeployment: env.APP_ENV === 'production',
		env,
		clientEnv: getClientEnv(),
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
