import { cloudflare } from '@cloudflare/vite-plugin'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { iconsSpritesheet } from 'vite-plugin-icons-spritesheet'
import tsconfigPaths from 'vite-tsconfig-paths'
import serverAdapter from 'hono-react-router-adapter/vite'
import path from 'path'

export default defineConfig({
	ssr: {
		noExternal: ['react-tweet'],
	},
	server: {
		hmr: {
			overlay: false,
		},
		watch: {
			ignored: ['**/node_modules/**', '**/.wrangler/**'],
		},
		fs: {
			allow: ['..'],
		},
	},
	build: {
		assetsDir: 'assets',
	},
	plugins: [
		reactRouter(),
		{
			name: 'css-hmr-fix',
			handleHotUpdate({ file, server }) {
				if (file.endsWith('.css')) {
					server.ws.send({
						type: 'custom',
						event: 'css-update',
						data: { file },
					})
					return []
				}
			},
		},
		tailwindcss(),
		cloudflare({
			persistState: false,
			viteEnvironment: { name: 'ssr' },
		}),
		tsconfigPaths(),
		iconsSpritesheet({
			inputDir: './other/icons',
			outputDir: './app/components/ui/icons',
			fileName: 'sprite.svg',
			withTypes: true,
			formatter: 'biome',
			iconNameTransformer: (name) => name,
		}),
		serverAdapter({
			entry: 'server/index.ts',
			exclude: [
				// defaults de @hono/vite-dev-server
				/.*\.css$/,
				/.*\.ts$/,
				/.*\.tsx$/,
				/^\/@.+$/,
				/\?t\=\d+$/,
				/^\/favicon\.ico$/,
				/^\/static\/.+/,
				/^\/node_modules\/.*/,
				'/assets/**',
				'/src/app/**',
				/\?(?:inline|url|no-inline|raw|import(?:&(?:inline|url|no-inline|raw)?)?)$/,
				/\?t=\d+&url$/,
			],
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './app'),
		},
	},
})
