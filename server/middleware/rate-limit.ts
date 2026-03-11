import type { Context } from 'hono'
import { createMiddleware } from 'hono/factory'
import { rateLimiter } from 'hono-rate-limiter'
import { IS_PROD } from '../utils/misc'

// Define your rate limit options
// When running tests or running in development, we want to effectively disable
// rate limiting because playwright tests are very fast and we don't want to
// have to wait for the rate limit to reset between tests.

let strongestRateLimit: ReturnType<typeof rateLimiter>
let strongRateLimit: ReturnType<typeof rateLimiter>
let generalRateLimit: ReturnType<typeof rateLimiter>
// Middleware pour gérer les limitations
export const rateLimitMiddleware = createMiddleware(async (c, next) => {
	// Inicialización diferida para evitar crashes en el arranque por falta de variables de entorno
	const isPlaywright = typeof process !== 'undefined' && !!process.env.PLAYWRIGHT_TEST_BASE_URL
	const maxMultiple = !IS_PROD() || isPlaywright ? 10_000 : 1

	if (!generalRateLimit) {
		generalRateLimit = rateLimiter({
			windowMs: 60 * 1000,
			limit: 100 * maxMultiple,
			keyGenerator: (c: Context) => c.get('fly-client-ip') ?? c.req.header('cf-connecting-ip'),
			standardHeaders: true,
		})
	}

	if (!strongRateLimit) {
		strongRateLimit = rateLimiter({
			windowMs: 60 * 1000,
			limit: 100 * maxMultiple,
			keyGenerator: (c: Context) => c.get('fly-client-ip') ?? c.req.header('cf-connecting-ip'),
			standardHeaders: true,
		})
	}

	if (!strongestRateLimit) {
		strongestRateLimit = rateLimiter({
			windowMs: 60 * 1000,
			limit: 10 * maxMultiple,
			keyGenerator: (c: Context) => c.get('fly-client-ip') ?? c.req.header('cf-connecting-ip'),
			standardHeaders: true,
		})
	}
	const path = c.req.url
	const method = c.req.method

	const strongPaths = ['/login', '/signup', '/verify', '/onboarding', '/reset-password']

	const isStrongPath = strongPaths.some((p) => path.includes(p))

	// For non-GET/HEAD requests, use stricter limits on sensitive paths
	if (method !== 'GET' && method !== 'HEAD') {
		return isStrongPath ? strongestRateLimit(c, next) : strongRateLimit(c, next)
	}

	// the verify route is a special case because it's a GET route that
	// can have a token in the query string
	if (path.includes('/verify')) {
		return strongestRateLimit(c, next)
	}

	// For all other requests, apply general rate limiting
	return generalRateLimit(c, next)
})
