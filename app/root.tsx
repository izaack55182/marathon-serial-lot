import {
	Links,
	Meta,
	type MetaFunction,
	Outlet,
	Scripts,
	ScrollRestoration,
	data,
} from 'react-router'

// UTILS
import { ClientHintCheck, getHints } from '@/utils/client-hints'
import { getColorScheme } from '@/utils/color-scheme.server'
import { createDomain, getMeta } from '@/utils/misc'

// COMPONENTS
import { EpicProgress } from './components/epic-progress'
import { GeneralErrorBoundary } from './components/error-boundary'
const iconsHref = '/icons/sprite.svg'

// ROUTES
import { useTheme } from './routes/resource/color-scheme'

// UI
import { Toaster } from './components/ui/sonner'

// CORE
import type { Route } from './+types/root'
import fontStyleSheetUrl from './styles/font.css?url'
import tailwindStyleSheetUrl from './styles/tailwind.css?url'
import appleTouchIconAssetUrl from '/favicons/apple-touch-icon.png'
import faviconAssetUrl from '/favicons/favicon.png'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	const origin = data?.origin ?? 'https://marathon-serial-lot.pages.dev'
	return getMeta({ origin })
}

export const links: Route.LinksFunction = () => {
	return [
		{ rel: 'preload', href: iconsHref, as: 'image' },
		{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
		{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' as const },
		{ rel: 'icon', href: '/favicons/favicon.ico', sizes: '48x48' },
		{ rel: 'apple-touch-icon', href: appleTouchIconAssetUrl },
		{ rel: 'manifest', href: '/site.webmanifest', crossOrigin: 'use-credentials' } as const,
		{ rel: 'icon', type: 'image/svg+xml', href: faviconAssetUrl },
		{ rel: 'stylesheet', href: tailwindStyleSheetUrl },
		{ rel: 'stylesheet', href: fontStyleSheetUrl },
	].filter(Boolean)
}

export async function loader({ request }: Route.LoaderArgs) {
	const hints = getHints(request)
	const colorScheme = await getColorScheme(request)
	const origin = createDomain(request)

	// Resuelve 'system' → tema real usando el hint del OS
	const theme = colorScheme === 'system' ? hints.theme : colorScheme

	return data({
		requestInfo: {
			hints,
			userPrefs: { colorScheme },
		},
		theme,
		origin,
		ENV: {
			ALLOW_INDEXING:
				(typeof process !== 'undefined' ? process.env.ALLOW_INDEXING : undefined) || 'true',
		},
	})
}

/**
 * Wrapper for the entire HTML document.
 */
function Document({
	children,
	nonce,
	colorScheme,
	env = {},
	allowIndexing = true,
}: {
	children: React.ReactNode
	nonce?: string
	colorScheme: string // requerida — siempre pásala desde App o ErrorBoundary
	env?: Record<string, string | undefined>
	allowIndexing?: boolean
}) {
	return (
		<html lang="es" className={colorScheme} suppressHydrationWarning={true}>
			<head>
				<ClientHintCheck nonce={nonce} />
				<Meta />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{allowIndexing ? null : <meta name="robots" content="noindex, nofollow" />}
				<Links />
			</head>
			<body className="bg-background text-foreground">
				{children}
				<script
					nonce={nonce}
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(env)}`,
					}}
				/>
				<ScrollRestoration nonce={nonce} />
				<Scripts nonce={nonce} />
			</body>
		</html>
	)
}

export default function App({ loaderData }: Route.ComponentProps) {
	const { ENV } = loaderData
	const theme = useTheme()
	const allowIndexing = ENV?.ALLOW_INDEXING !== 'false'
	const nonce = undefined

	return (
		<Document nonce={nonce} env={ENV} colorScheme={theme} allowIndexing={allowIndexing}>
			<Outlet />
			<Toaster />
			<EpicProgress />
		</Document>
	)
}

export function Layout({ children }: { children: React.ReactNode }) {
	return children
}
export const ErrorBoundary = GeneralErrorBoundary
