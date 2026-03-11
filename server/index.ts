import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { createMiddleware } from 'hono/factory'
import { getLoadContext } from './context'
import { initEnv } from '@/utils/env.server'

import { epicLogger } from './middleware/epic-logger.ts'
import { removeTrailingSlash } from './middleware/remove-trailing-slash.ts'
import { secureHeadersMiddleware } from './middleware/secure-headers.ts'
import { rateLimitMiddleware } from './middleware/rate-limit.ts'

const app = new Hono()

app.use('*', epicLogger())
app.use(removeTrailingSlash)

// SVG MIME Type Fix (Ensures icons are rendered correctly by the browser)
app.use('*', async (c, next) => {
	await next()
	if (c.req.path.endsWith('.svg')) {
		c.header('Content-Type', 'image/svg+xml')
	}
})

// Ensure HTTPS only
app.use('*', async (c, next) => {
	if (c.req.method !== 'GET') return await next()

	const proto = c.req.header('X-Forwarded-Proto')
	const host = c.req.header('X-Forwarded-Host') || c.req.header('Host')
	if (proto === 'http') {
		const secureUrl = `https://${host}${c.req.url}`
		return c.redirect(secureUrl, 301)
	}
	await next()
})

app.use('*', secureHeadersMiddleware)
app.use('*', rateLimitMiddleware)

app.use('*', poweredBy({ serverName: 'CODENITY' }))

// No indexing if configured
app.use(
	'*',
	createMiddleware(async (c, next) => {
		const env = initEnv(c.env)
		if (env.ALLOW_INDEXING === 'false') {
			c.header('X-Robots-Tag', 'noindex, nofollow')
		}
		await next()
	})
)

// Export load context for adapter
export { getLoadContext }
export default app
