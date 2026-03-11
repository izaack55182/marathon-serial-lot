/**
 * Simple environment variable helper
 */
import { z } from 'zod'
const envSchema = z.object({
	NODE_ENV: z.enum(['production', 'development', 'test'] as const).default('development'),
	APP_ENV: z.enum(['development', 'staging', 'production']).default('development'),

	// APP SECRETS
	COOKIE_SECRET: z.string().default('dev_secret_key_12345'),

	// SEO
	ALLOW_INDEXING: z.enum(['true', 'false']).optional(),
	// ACUMATICA ODATA
	ACUMATICA_USERNAME: z.string().optional(),
	ACUMATICA_PASSWORD: z.string().optional(),
})

type ServerEnv = z.infer<typeof envSchema>
let env: ServerEnv

export function initEnv(runtimeEnv?: unknown) {
	// biome-ignore lint/nursery/noProcessEnv: This is the only place to use process.env directly
	const source = runtimeEnv || (typeof process !== 'undefined' ? process.env : {})
	const parsed = envSchema.safeParse(source)

	if (parsed.success === false) {
		// biome-ignore lint/suspicious/noConsole: We want this to be logged
		console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)
		
		// Debug log para ver qué variables están llegando realmente (sin mostrar valores sensibles)
		console.log('🔍 Variables disponibles en el entorno:', Object.keys(source as object))
		
		throw new Error(`Invalid environment variables: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`)
	}

	env = parsed.data
	Object.freeze(env)

	return env
}
export function getServerEnv() {
	if (env) return env
	return initEnv()
}

export function getClientEnv() {
	const serverEnv = getServerEnv()
	return {
		MODE: serverEnv.NODE_ENV,
		ALLOW_INDEXING: serverEnv.ALLOW_INDEXING,
	}
}

type ClientEnvVars = ReturnType<typeof getClientEnv>

declare global {
	var ENV: ClientEnvVars
	interface Window {
		ENV: ClientEnvVars
	}
}
