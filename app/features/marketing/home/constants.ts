import type { IconName } from '@/components/ui/icons/types'

export const STACK_PILLS = [
	{
		label: 'React Router',
		logo: '/images/brands/reactrouter.svg',
		color: 'text-red-400',
		glow: 'bg-red-400',
	},
	{
		label: 'TypeScript',
		logo: '/images/brands/typescript.svg',
		color: 'text-blue-400',
		glow: 'bg-blue-400',
	},
	{ label: 'Bun', logo: '/images/brands/bun.svg', color: 'text-white', glow: 'bg-white' },
	{
		label: 'Cloudflare',
		logo: '/images/brands/cloudflare.svg',
		color: 'text-orange-400',
		glow: 'bg-orange-400',
	},
	{
		label: 'Hono',
		logo: '/images/brands/hono.svg',
		color: 'text-orange-600',
		glow: 'bg-orange-600',
	},
	{
		label: 'Biome',
		logo: '/images/brands/biomejs.svg',
		color: 'text-blue-400',
		glow: 'bg-blue-400',
	},
	{ label: 'Zod', logo: '/images/brands/zod.svg', color: 'text-sky-300', glow: 'bg-sky-300' },
	{
		label: 'Tailwind CSS',
		logo: '/images/brands/tailwindcss.svg',
		color: 'text-cyan-400',
		glow: 'bg-cyan-400',
	},
]

export const METRICS = [
	{ value: 97, suffix: '', label: 'Rendimiento PageSpeed' },
	{ value: 8, suffix: 'ms', label: 'Latencia en el Edge' },
	{ value: 310, suffix: '+', label: 'Nodos Globales' },
	{ value: 30, suffix: 's', label: 'Time-to-Production' },
]

// ── Feature Items (Remix Style) ────────────────────────────────────────────────

export const FEATURES = [
	{
		title: 'React Router 7',
		desc: 'Arquitectura nativa de loaders y actions para una gestión de datos ultra-eficiente sin client waterfalls.',
		hoverColor: '#ec4899', // pink-500
	},
	{
		title: 'Bun Runtime',
		desc: 'El motor JS más rápido del mundo. Instalación, empaquetado y ejecución en milisegundos.',
		hoverColor: '#f97316', // orange-500
	},
	{
		title: 'Cloudflare Edge',
		desc: 'Despliegue distribuido en 310+ nodos. Tu aplicación se ejecuta físicamente cerca de cada usuario.',
		hoverColor: '#0ea5e9', // sky-500
	},
	{
		title: 'Cloudflare D1',
		desc: 'Base de datos SQL nativa del Edge. Replicación global automática y latencia cero de lectura.',
		hoverColor: '#F48120', // Cloudflare Orange
	},
	{
		title: 'PostgreSQL',
		desc: 'El estándar para datos relacionales Enterprise. Compatibilidad total para integraciones con Spring Boot.',
		hoverColor: '#336791', // Postgres Blue
	},
	{
		title: 'Shadcn/ui',
		desc: 'Sistema de diseño premium y accesible. Componentes de alta fidelidad totalmente personalizables.',
		hoverColor: '#e5e5e5', // white/neutral
	},
	{
		title: 'TypeScript 5',
		desc: 'Seguridad de tipos estricta de extremo a extremo (E2E) para aplicaciones robustas y escalables.',
		hoverColor: '#3b82f6', // blue-500
	},
	{
		title: 'Biome JS',
		desc: 'Toolchain unificado para formateo y linting. Rendimiento 100x superior a herramientas legacy.',
		hoverColor: '#E2B71B', // biome yellow
	},
	{
		title: 'Tailwind CSS',
		desc: 'Estilo atómico optimizado para producción. Diseño fluido y consistente sin archivos CSS pesados.',
		hoverColor: '#06b6d4', // cyan-500
	},
	{
		title: 'Lucide Icons',
		desc: 'Iconografía vectorial consistente y ligera diseñada para interfaces modernas y limpias.',
		hoverColor: '#f43f5e', // rose-500
	},
]

export const ARCHITECTURE_POINTS = [
	'Red Edge Global con 310+ nodos Cloudflare',
	'Persistencia nativa con D1 SQL · KV · R2',
	'Seguridad avanzada Tier-1 & WAF dinámico',
	'Latencia ultra-baja <100ms global (P99)',
]

export const REQUEST_FLOW_STEPS = [
	{
		label: 'Request Cliente',
		sub: 'Petición HTTP/3 distribuida',
		color: 'bg-muted',
		textColor: 'text-foreground',
	},
	{
		label: 'Cloudflare Network',
		sub: 'Anycast Routing — ~5ms',
		color: 'bg-sky-500/10 border-sky-500/30',
		textColor: 'text-sky-400',
	},
	{
		label: 'Workers Engine',
		sub: 'Ejecución V8 aislada (Cold start: 0ms)',
		color: 'bg-orange-500/10 border-orange-500/30',
		textColor: 'text-orange-400',
	},
	{
		label: 'RR7 Full-stack',
		sub: 'Data Fetching & HTML Streaming',
		color: 'bg-pink-500/10 border-pink-500/30',
		textColor: 'text-pink-400',
	},
	{
		label: 'Render Final',
		sub: 'Página hidratada e interactiva',
		color: 'bg-emerald-500/10 border-emerald-500/30',
		textColor: 'text-emerald-400',
	},
]

export type DXItem = {
	icon: IconName
	label: string
}
export const DX_ITEMS: DXItem[] = [
	{ icon: 'zap', label: 'HMR ultra-sónico' },
	{ icon: 'code', label: 'Tipado E2E nativo' },
	{ icon: 'layers', label: 'File-based Routing' },
	{ icon: 'git-branch', label: 'Edge-ready CD/CI' },
]

export type MiniMetric = {
	label: string
	value: string
	change: string
}

export const MINI_METRICS: MiniMetric[] = [
	{ label: 'Req / seg', value: '142k', change: '+12%' },
	{ label: 'Latencia P99', value: '1.4ms', change: '-0.3ms' },
	{ label: 'Ubicaciones Edge', value: '310', change: '+5' },
	{ label: 'Tasa de Error', value: '0.01%', change: '-0.02%' },
]

export const TESTIMONIAL_TWEETS = [
	'1459941582912827398', // Radix UI / Performance
	'1544460933753229312', // Jarred Sumner (Bun)
	'1755918225265848658', // Hono JS v4
	'1456407168291278851', // Hono JS v4
]

export const CHART_DATA = [38, 52, 45, 61, 55, 72, 68, 80, 74, 88, 82, 95]

export const LIVE_ROUTES = [
	{ method: 'GET', path: '/', ms: '0.4ms', status: 200 },
	{ method: 'GET', path: '/api/users', ms: '1.1ms', status: 200 },
	{ method: 'POST', path: '/api/deploy', ms: '2.3ms', status: 201 },
	{ method: 'GET', path: '/dashboard', ms: '0.8ms', status: 200 },
]

export const USE_CASES_DATA = [
	{
		number: '01',
		tag: 'Branding & Marketing',
		title: 'Experiencias de marca\ninolvidables y veloces.',
		description:
			'Destaca con landings de alto impacto, portfolios fluidos y sitios corporativos con SEO técnico optimizado y tiempos de respuesta instantáneos.',
		highlights: ['SEO de élite', 'Imágenes Next-gen', 'LCP < 1s', 'Social Cards dinámicas'],
		accent: 'text-pink-400',
		border: 'border-pink-400/20',
		glow: 'from-pink-500/5',
		tagStyle: 'border-pink-400/20 text-pink-400',
		dot: 'bg-pink-400',
		className: 'md:col-span-1',
	},
	{
		number: '02',
		tag: 'SaaS Infrastructure',
		title: 'Escala tu producto\ndesde el primer commit.',
		description:
			'Arquitectura modular con autenticación, facturación y gestión de roles lista para producción. Céntrate en tu lógica de negocio, no en el boilerplate.',
		highlights: ['Auth E2E', 'Stripe Ready', 'RBAC nativo', 'API Type-safe'],
		accent: 'text-sky-400',
		border: 'border-sky-400/20',
		glow: 'from-sky-500/5',
		tagStyle: 'border-sky-400/20 text-sky-400',
		dot: 'bg-sky-400',
		className: 'md:col-span-2',
	},
	{
		number: '03',
		tag: 'Hyper-speed E-commerce',
		title: 'Ventas globales sin\nfricción en el Edge.',
		description:
			'Rendimiento transaccional masivo. Cada paso del embudo de ventas se ejecuta en el PoP más cercano al cliente, maximizando la conversión.',
		highlights: [
			'Checkout en el Edge',
			'Stock en Tiempo Real',
			'HTML Streaming',
			'KV Global Cache',
		],
		accent: 'text-orange-400',
		border: 'border-orange-400/20',
		glow: 'from-orange-500/5',
		tagStyle: 'border-orange-400/20 text-orange-400',
		dot: 'bg-orange-400',
		className: 'md:col-span-1',
	},
	{
		number: '04',
		tag: 'Real-time Intelligence',
		title: 'Dashboards vivos con\ndatos de latencia cero.',
		description:
			'Visualiza métricas y datos críticos con streaming nativo de React Router 7 sobre Cloudflare Workers. Sin spinners, simplemente datos al instante.',
		highlights: [
			'Streaming Nativo',
			'WebSockets / SSE',
			'Live Data Feed',
			'Internal Latency < 2ms',
		],
		accent: 'text-emerald-400',
		border: 'border-emerald-400/20',
		glow: 'from-emerald-500/5',
		tagStyle: 'border-emerald-400/20 text-emerald-400',
		dot: 'bg-emerald-400',
		className: 'md:col-span-2',
	},
]

export const ECOMMERCE_PRODUCTS = [
	{ name: 'Wireless Headphones', price: '$129', badge: 'Edge cached', ms: '8ms' },
	{ name: 'Mechanical Keyboard', price: '$249', badge: 'KV hit', ms: '3ms' },
	{ name: 'USB-C Hub Pro', price: '$79', badge: 'Streamed', ms: '12ms' },
]

export const DASHBOARD_BARS = [40, 65, 50, 80, 55, 90, 70, 85, 60, 95, 75, 100]

export const BACKEND_OPTIONS = [
	{
		id: 'react-router',
		tag: 'Full-Stack Edge',
		name: 'React Router',
		logoSrc: '/images/brands/reactrouter.svg',
		logoColor: 'text-red-500',
		shadowColor: 'rgba(248, 113, 113, 0.5)',
		tagline: 'Una sola base de código.\nVelocidad pura.',
		description:
			'La arquitectura BFF (Backend for Frontend) definitiva. Utiliza Loaders y Actions en el servidor conectándote directamente a tu base de datos con Drizzle ORM, eliminando la sobrecarga de APIs externas.',
		highlights: [
			'Server Loaders y Actions',
			'Tipado de Extremo a Extremo',
			'Sin Client Waterfalls',
			'Drizzle ORM Integrado',
			'Ejecución en el Edge',
			'Zero-API Architecture',
		],
		badge: 'Recomendado',
		badgeStyle: 'bg-red-500/10 text-red-500 border-red-500/20',
		accent: 'text-red-500',
		border: 'border-red-500/20',
		ring: 'ring-red-500/30',
		glow: 'from-red-500/5',
		dot: 'bg-red-500',
	},
	{
		id: 'spring',
		tag: 'Robust & Solid',
		name: 'Spring Boot',
		logoSrc: '/images/brands/spring.svg',
		logoColor: 'text-emerald-500',
		shadowColor: 'rgba(16, 185, 129, 0.5)',
		tagline: 'Ecosistema maduro.\nEscala Enterprise.',
		description:
			'Integra la potencia de Spring Boot como el núcleo de tu aplicación. Codenity Stack actúa como una capa de Edge ultra-rápida mientras Spring maneja procesos de negocio complejos y persistencia robusta.',
		highlights: [
			'Spring Boot / Quarkus',
			'Inyección de Dependencias',
			'Soporte LTS Enterprise',
			'Seguridad de nivel Bancario',
			'Arquitectura Distribuida',
			'Integraciones Robustas',
		],
		badge: 'Enterprise',
		badgeStyle: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
		accent: 'text-emerald-400',
		border: 'border-emerald-400/20',
		ring: 'ring-emerald-400/30',
		glow: 'from-emerald-500/5',
		dot: 'bg-emerald-400',
	},
]

export const DATABASE_OPTIONS = [
	{
		id: 'd1',
		tag: 'Serverless SQL',
		name: 'Cloudflare D1',
		logoSrc: '/images/brands/cloudflare.svg',
		logoColor: 'text-orange-500',
		shadowColor: 'rgba(249, 115, 22, 0.5)',
		tagline: 'SQLite en el Edge.\nReplicación global.',
		description:
			'Base de datos SQL nativa de Cloudflare. Tus datos viven cerca de tus usuarios con latencia de lectura casi nula, sin servidores que administrar.',
		highlights: [
			'SQLite Standard',
			'Time-travel recovery',
			'Sin servidores (Serverless)',
			'Lecturas globales',
			'Integración Drizzle ORM',
			'Cheap Storage',
		],
		badge: 'Modern Choice',
		badgeStyle: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
		accent: 'text-orange-400',
		border: 'border-orange-400/20',
		ring: 'ring-orange-400/30',
		glow: 'from-orange-500/5',
		dot: 'bg-orange-400',
	},
	{
		id: 'postgres',
		tag: 'Legacy & Solid',
		name: 'PostgreSQL',
		logoSrc: '/images/brands/postgresql.svg',
		logoColor: 'text-blue-500',
		shadowColor: 'rgba(51, 103, 145, 0.5)',
		tagline: 'El estándar del mundo.\nFiabilidad total.',
		description:
			'El motor relacional de código abierto más avanzado. Perfecto para modelos de datos complejos, sistemas transaccionales masivos y compatibilidad con Spring Boot.',
		highlights: [
			'ACID Compliant',
			'Ecosistema masivo',
			'Extensiones (PostGIS)',
			'Integración Spring Boot',
			'Complex Queries',
			'Row Level Security',
		],
		badge: 'Enterprise Standard',
		badgeStyle: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
		accent: 'text-blue-400',
		border: 'border-blue-400/20',
		ring: 'ring-blue-400/30',
		glow: 'from-blue-500/5',
		dot: 'bg-blue-400',
	},
]

export type ServiceItem = {
	number: string
	title: string
	description: string
	icon: string
	iconImage: string
	accent: string
	border: string
	glow: string
	dot: string
	tag: string
	tagStyle: string
	features: string[]
	cta: string
}

export const SERVICES: ServiceItem[] = [
	{
		number: '01',
		title: 'Infraestructura de Alto Rendimiento',
		description:
			'Cimientos robustos diseñados para escalar sin límites. Despliegue global instantáneo con configuración cero.',
		icon: 'zap',
		iconImage: '/images/brands/hono.svg',
		accent: 'text-orange-400',
		border: 'border-orange-400/20',
		glow: 'from-orange-500/5',
		dot: 'bg-orange-400',
		tag: 'Inmediatez',
		tagStyle: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
		features: ['Carga Ultra-rápida', 'Mantenimiento Automatizado', 'Anycast Edge Network'],
		cta: 'Ver Documentación',
	},
	{
		number: '02',
		title: 'Arquitectura Enterprise-ready',
		description:
			'Sistemas distribuidos con seguridad Tier-1 y tipado estricto. La fiabilidad que tu negocio necesita en cada petición.',
		icon: 'shield',
		iconImage: '/images/brands/cloudflare.svg',
		accent: 'text-sky-400',
		border: 'border-sky-400/20',
		glow: 'from-sky-500/5',
		dot: 'bg-sky-400',
		tag: 'Robustez',
		tagStyle: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
		features: ['Seguridad Dinámica', 'Escalabilidad Elástica', 'Full Type-safety'],
		cta: 'Explorar Arquitectura',
	},
	{
		number: '03',
		title: 'Optimización de Conversión',
		description:
			'Experiencias web fluidas y optimizadas para SEO. Maximiza la retención con tiempos de carga invisibles.',
		icon: 'globe',
		iconImage: '/images/brands/reactrouter.svg',
		accent: 'text-emerald-400',
		border: 'border-emerald-400/20',
		glow: 'from-emerald-500/5',
		dot: 'bg-emerald-400',
		tag: 'Resultados',
		tagStyle: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
		features: ['SEO de Precisión', 'Streaming de Datos', 'Core Web Vitals A+'],
		cta: 'Ver Casos de Éxito',
	},
]

export const TOWERS = [
	{ height: 28, delay: 0 },
	{ height: 40, delay: 0.3 },
	{ height: 24, delay: 0.8 },
	{ height: 60, delay: 0.1 },
	{ height: 34, delay: 0.5 },
	{ height: 68, delay: 0.2 },
	{ height: 26, delay: 1.1 },
	{ height: 45, delay: 0.6 },
	{ height: 56, delay: 0.4 },
	{ height: 32, delay: 0.9 },
	{ height: 65, delay: 0.15 },
	{ height: 20, delay: 0.7 },
	{ height: 36, delay: 0.35 },
	{ height: 50, delay: 1.2 },
	{ height: 62, delay: 0.55 },
	{ height: 24, delay: 0.85 },
	{ height: 48, delay: 0.25 },
	{ height: 22, delay: 1.0 },
	{ height: 35, delay: 0.45 },
	{ height: 54, delay: 0.65 },
]

export const LIGHTS = [
	{ col: 0, delay: 0, duration: 8.0, size: 4 },
	{ col: 2, delay: 0.8, duration: 8.2, size: 5 },
	{ col: 4, delay: 0.5, duration: 7.8, size: 4 },
	{ col: 5, delay: 0.2, duration: 8.5, size: 6 },
	{ col: 7, delay: 1.1, duration: 7.9, size: 4 },
	{ col: 8, delay: 0.4, duration: 8.3, size: 5 },
	{ col: 10, delay: 0.15, duration: 8.1, size: 6 },
	{ col: 11, delay: 0.9, duration: 7.7, size: 4 },
	{ col: 13, delay: 1.4, duration: 8.4, size: 5 },
	{ col: 15, delay: 0.6, duration: 8.0, size: 4 },
	{ col: 16, delay: 0.3, duration: 7.6, size: 5 },
	{ col: 18, delay: 1.8, duration: 8.6, size: 4 },
]

// ─── Data ─────────────────────────────────────────────────────────────────────
export const STACK_COMPARISON_STATS = [
	{
		category: 'Throughput Bruto',
		value: '142k+',
		unit: 'Req / sec',
		label: 'Codenity vs 8k Laravel',
		accent: 'sky',
		icon: 'zap',
		competitors: [
			{ name: 'Codenity', val: '142k', pct: 100, ours: true },
			{ name: 'Remix', val: '50k', pct: 35, ours: false },
			{ name: 'Next.js', val: '48k', pct: 34, ours: false },
			{ name: 'Laravel', val: '8k', pct: 6, ours: false },
		],
	},
	{
		category: 'Latencia P99',
		value: '< 8ms',
		unit: 'Global Edge',
		label: 'Codenity vs 200ms Typical',
		accent: 'emerald',
		icon: 'globe',
		competitors: [
			{ name: 'Codenity', val: '8ms', pct: 100, ours: true },
			{ name: 'Remix', val: '160ms', pct: 22, ours: false },
			{ name: 'Next.js', val: '190ms', pct: 18, ours: false },
			{ name: 'Laravel', val: '360ms', pct: 9, ours: false },
		],
	},
	{
		category: 'Arranque Cero',
		value: '0ms',
		unit: 'V8 Isolates',
		label: 'Codenity vs 5s Virtual Machines',
		accent: 'orange',
		icon: 'rocket',
		competitors: [
			{ name: 'Codenity', val: '0ms', pct: 100, ours: true },
			{ name: 'Next.js', val: '800ms', pct: 0, ours: false },
			{ name: 'Remix', val: '900ms', pct: 0, ours: false },
			{ name: 'Laravel', val: '3.2s', pct: 0, ours: false },
		],
	},
	{
		category: 'DX Ultra-Sónica',
		value: '180ms',
		unit: 'Cold Install',
		label: 'Codenity vs 18s npm',
		accent: 'yellow',
		icon: 'package',
		competitors: [
			{ name: 'Codenity', val: '180ms', pct: 100, ours: true },
			{ name: 'pnpm', val: '4.1s', pct: 12, ours: false },
			{ name: 'yarn', val: '14s', pct: 3, ours: false },
			{ name: 'npm', val: '18s', pct: 1, ours: false },
		],
	},
]

// ─── Accent map ───────────────────────────────────────────────────────────────
export const ACCENT = {
	sky: {
		badge: 'text-sky-600 dark:text-sky-400 bg-sky-500/5 dark:bg-sky-500/10 border-sky-500/20',
		bar: 'bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.35)]',
		text: 'text-sky-600 dark:text-sky-400',
	},
	emerald: {
		badge:
			'text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20',
		bar: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.35)]',
		text: 'text-emerald-600 dark:text-emerald-400',
	},
	orange: {
		badge:
			'text-orange-600 dark:text-orange-400 bg-orange-500/5 dark:bg-orange-500/10 border-orange-500/20',
		bar: 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.35)]',
		text: 'text-orange-600 dark:text-orange-400',
	},
	yellow: {
		badge:
			'text-yellow-600 dark:text-yellow-400 bg-yellow-500/5 dark:bg-yellow-500/10 border-yellow-500/20',
		bar: 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.35)]',
		text: 'text-yellow-600 dark:text-yellow-400',
	},
} as const
