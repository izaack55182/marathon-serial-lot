import { index, layout, prefix, type RouteConfig, route } from '@react-router/dev/routes'
import { coreRoutes } from './features/core/routes'
import { inventoryRoutes } from './features/inventory/routes'
import { securityRoutes } from './features/security/routes'

export default [
	// REDIRECTS
	index('routes/home-redirect.tsx', { id: 'home-root-redirect' }),

	// 1. PUBLIC / MARKETING (Disabled)

	// 2. AUTHENTICATION (SECURITY)
	...securityRoutes,

	// 3. APPLICATION (CENTRALIZED)
	...prefix('c', [
		layout('routes/layout/layout-app.tsx', [
			index('routes/home-redirect.tsx', { id: 'app-root-redirect' }),
			...coreRoutes,
			...inventoryRoutes,
		]),
	]),

	// 4. RESOURCE ROUTES
	...prefix('r', [
		route('color-scheme', 'routes/resource/color-scheme.tsx'),
	]),

	// 5. SYSTEM / ERRORS
	route('404', 'routes/404.tsx'),
	route('500', 'routes/500.tsx'),
	route('*', 'routes/catch-all.tsx'),
] satisfies RouteConfig
