import { motion } from 'motion/react'
import { MorphingText } from '@/components/ui/morphing-text'
import { cn } from '@/utils/misc'
import { DASHBOARD_BARS, ECOMMERCE_PRODUCTS, USE_CASES_DATA } from '../constants'

// ── Visuals ───────────────────────────────────────────────────────────────────

function SaaSVisual() {
	return (
		<div className="w-full h-full flex flex-col gap-1.5 p-4 font-mono text-xs">
			<div className="flex items-center gap-1.5 mb-0.5">
				<span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
				<span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
				<span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
				<span className="ml-1 text-muted-foreground/60 text-[9px]">routes/_app.tsx</span>
			</div>
			<div className="flex flex-col gap-0.5 text-[10px] leading-snug">
				<div>
					<span className="text-purple-600 dark:text-purple-400">export </span>
					<span className="text-blue-600 dark:text-sky-400">async function </span>
					<span className="text-yellow-600 dark:text-yellow-300">loader</span>
					<span className="text-zinc-500 dark:text-white/50">{'({ request }) {'}</span>
				</div>
				<div className="pl-3 text-zinc-400 dark:text-white/40 italic text-[9px]">
					{'// Carga segura desde D1 SQL'}
				</div>
				<div className="pl-3">
					<span className="text-blue-600 dark:text-sky-400">const </span>
					<span className="text-zinc-700 dark:text-white/80">user </span>
					<span className="text-zinc-500 dark:text-white/50">= await </span>
					<span className="text-yellow-600 dark:text-yellow-300">requireAuth</span>
					<span className="text-zinc-500 dark:text-white/50">(request);</span>
				</div>
				<div className="pl-3">
					<span className="text-blue-600 dark:text-sky-400">const </span>
					<span className="text-zinc-700 dark:text-white/80">plan </span>
					<span className="text-zinc-500 dark:text-white/50">= await </span>
					<span className="text-yellow-600 dark:text-yellow-300">db</span>
					<span className="text-zinc-500 dark:text-white/50">.select().from(billing);</span>
				</div>
				<div className="pl-3">
					<span className="text-purple-600 dark:text-purple-400">return </span>
					<span className="text-yellow-600 dark:text-yellow-300">json</span>
					<span className="text-zinc-500 dark:text-white/50">{'({ user, plan })'}</span>
				</div>
				<div className="text-zinc-500 dark:text-white/50">{'}'}</div>

				<div className="mt-2">
					<span className="text-purple-600 dark:text-purple-400">export </span>
					<span className="text-blue-600 dark:text-sky-400">async function </span>
					<span className="text-yellow-600 dark:text-yellow-300">action</span>
					<span className="text-zinc-500 dark:text-white/50">{'({ request }) {'}</span>
				</div>
				<div className="pl-3">
					<span className="text-blue-600 dark:text-sky-400">const </span>
					<span className="text-zinc-700 dark:text-white/80">form </span>
					<span className="text-zinc-500 dark:text-white/50">= await </span>
					<span className="text-yellow-600 dark:text-yellow-300">request</span>
					<span className="text-zinc-500 dark:text-white/50">.formData();</span>
				</div>
				<div className="pl-3">
					<span className="text-purple-600 dark:text-purple-400">return </span>
					<span className="text-yellow-600 dark:text-yellow-300">redirect</span>
					<span className="text-zinc-500 dark:text-white/50">{"('/dashboard')"}</span>
				</div>
				<div className="text-zinc-500 dark:text-white/50">{'}'}</div>
			</div>
			<div className="mt-auto flex items-center gap-2.5 rounded-lg border border-border bg-muted/20 px-2.5 py-2">
				<div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 text-[9px] font-bold">
					A
				</div>
				<div className="flex flex-col">
					<span className="text-[10px] text-foreground/80 font-medium">alice@acme.com</span>
					<span className="text-[8px] text-blue-500 dark:text-sky-400">Pro Plan · Active</span>
				</div>
				<span className="ml-auto text-[8px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full">
					✓ Auth
				</span>
			</div>
		</div>
	)
}

function EcommerceVisual() {
	return (
		<div className="w-full h-full flex flex-col gap-1.5 p-4 font-mono text-xs">
			<div className="text-[9px] text-muted-foreground/40 uppercase tracking-widest mb-0.5">
				Product listing · 3 items
			</div>
			{ECOMMERCE_PRODUCTS.map((p, i) => (
				<motion.div
					key={p.name}
					initial={{ opacity: 0, x: 8 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.3 + i * 0.12, duration: 0.35 }}
					className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-2.5 py-1.5"
				>
					<div className="flex flex-col">
						<span className="text-[10px] text-foreground/80">{p.name}</span>
						<span className="text-[8px] text-orange-500 dark:text-orange-400">{p.badge}</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-[8px] text-muted-foreground/60">{p.ms}</span>
						<span className="text-[10px] text-foreground/90 font-semibold">{p.price}</span>
					</div>
				</motion.div>
			))}
			<div className="mt-auto flex items-center justify-between border-t border-border pt-1.5">
				<span className="text-[9px] text-muted-foreground/60">Total response time</span>
				<span className="text-[10px] text-orange-500 dark:text-orange-400 font-semibold">
					~23ms globally
				</span>
			</div>
		</div>
	)
}

function DashboardVisual() {
	return (
		<div className="w-full h-full flex flex-col gap-2 p-4 font-mono text-xs">
			<div className="flex items-center justify-between">
				<span className="text-[9px] text-muted-foreground/60 uppercase tracking-widest">
					Live metrics
				</span>
				<span className="flex items-center gap-1.5 text-[9px] text-emerald-600 dark:text-emerald-400">
					<motion.span
						className="w-1 h-1 rounded-full bg-emerald-500 dark:bg-emerald-400 inline-block"
						animate={{ opacity: [1, 0.3, 1] }}
						transition={{
							duration: 1.2,
							repeat: Infinity,
							repeatType: 'reverse',
						}}
					/>
					streaming
				</span>
			</div>
			<div className="grid grid-cols-3 gap-1.5">
				{[
					{ label: 'P99', value: '1.4ms', color: 'text-emerald-600 dark:text-emerald-400' },
					{ label: 'RPS', value: '142k', color: 'text-blue-600 dark:text-sky-400' },
					{ label: 'Uptime', value: '99.99%', color: 'text-emerald-600 dark:text-emerald-400' },
				].map((s) => (
					<div
						key={s.label}
						className="rounded-md border border-border bg-muted/20 px-2 py-1.5 flex flex-col"
					>
						<span className="text-[8px] text-muted-foreground/60">{s.label}</span>
						<span className={cn('text-[11px] font-bold', s.color)}>{s.value}</span>
					</div>
				))}
			</div>
			<div className="flex-1 flex items-end gap-1 mt-2">
				{DASHBOARD_BARS.map((h, i) => (
					<motion.div
						key={i}
						className="flex-1 rounded-t-sm"
						style={{
							background: i === DASHBOARD_BARS.length - 1 ? '#34d399' : 'rgba(52,211,153,0.15)',
						}}
						initial={{ height: 0 }}
						whileInView={{ height: `${h}%` }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.4 + i * 0.04, ease: 'easeOut' }}
					/>
				))}
			</div>
		</div>
	)
}

function MarketingVisual() {
	return (
		<div className="w-full h-full flex flex-col gap-3 p-4 font-sans">
			{/* Search Result */}
			<motion.div
				className="flex flex-col gap-1"
				initial={{ opacity: 0, y: 10 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: 0.1 }}
			>
				<div className="flex items-center gap-2">
					<div className="w-4 h-4 rounded-full bg-pink-500/10 flex items-center justify-center text-[9px] font-bold text-pink-500">
						A
					</div>
					<div className="flex flex-col">
						<span className="text-[9px] font-medium text-foreground leading-none">Epic Inc.</span>
						<span className="text-[8px] text-muted-foreground">https://Epic.com</span>
					</div>
				</div>
				<div className="text-[11px] font-medium text-blue-500 dark:text-blue-400 mt-0.5 hover:underline cursor-pointer leading-tight">
					Epic Inc — Digital Experiences
				</div>
				<p className="text-[9px] text-muted-foreground/70 leading-normal max-w-[95%]">
					Building brands that matter. Fast, accessible, and beautiful web experiences for
					forward-thinking companies.
				</p>
			</motion.div>

			{/* Social Card Preview */}
			<motion.div
				className="mt-auto rounded-lg border border-border bg-card overflow-hidden shadow-sm"
				initial={{ opacity: 0, scale: 0.95 }}
				whileInView={{ opacity: 1, scale: 1 }}
				viewport={{ once: true }}
				transition={{ delay: 0.2 }}
			>
				<div className="h-16 bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-orange-500/10 flex items-center justify-center relative">
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
					<div className="w-7 h-7 rounded-lg bg-background/40 md:backdrop-blur-md flex items-center justify-center border border-white/10 shadow-sm z-10">
						<span className="text-sm">✨</span>
					</div>
				</div>
				<div className="p-2.5 bg-muted/30 border-t border-border text-[9px]">
					<div className="font-bold text-foreground">The New Standard</div>
					<div className="text-muted-foreground mt-0.5 line-clamp-1">
						Discover how to redefine digital brand presence...
					</div>
				</div>
			</motion.div>
		</div>
	)
}

const VISUALS = [<MarketingVisual />, <SaaSVisual />, <EcommerceVisual />, <DashboardVisual />]

// ── Section ───────────────────────────────────────────────────────────────────

export function UseCases() {
	return (
		<section
			id="use-cases"
			className="w-full px-4 py-12 md:py-24 bg-background border-t border-border overflow-hidden"
		>
			<div className="mx-auto max-w-6xl flex flex-col gap-12 md:gap-16">
				{/* Header */}
				<div className="grid md:grid-cols-2 gap-8 items-end">
					<div className="flex flex-col gap-4">
						<motion.p
							className="font-mono text-xs uppercase tracking-[3px] text-muted-foreground"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4 }}
						>
							Casos de Uso
						</motion.p>
						<motion.h2
							className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight"
							initial={{ opacity: 0, y: 12 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							Crea sin{' '}
							<div className="inline-block relative h-[1.2em] w-full max-w-md align-top">
								<MorphingText
									texts={['Límites', 'Fricción', 'Barreras']}
									className="!text-4xl md:!text-6xl !text-left !mx-0 !font-bold text-pink-400"
								/>
							</div>
						</motion.h2>
					</div>
					<motion.p
						className="text-sm text-muted-foreground leading-relaxed md:max-w-sm md:ml-auto"
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.15 }}
					>
						Desde startups hasta empresas globales. Este stack proporciona los cimientos de alto
						rendimiento necesarios para cualquier tipo de plataforma moderna.
					</motion.p>
				</div>

				{/* Use case rows — Bento Grid style */}
				<div className="grid md:grid-cols-3 gap-4">
					{USE_CASES_DATA.map((uc, i) => (
						<motion.div
							key={uc.number}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-50px' }}
							transition={{
								duration: 0.5,
								delay: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : i * 0.1,
							}}
							className={cn(
								'group relative overflow-hidden rounded-2xl border border-border bg-card',
								'hover:shadow-md transition-[box-shadow] duration-300',
								uc.className
							)}
						>
							<div className="h-full flex flex-col">
								{/* Gradient glow */}
								<div
									className={cn(
										'absolute inset-0 bg-gradient-to-br pointer-events-none opacity-40 transition-none',
										uc.glow,
										'to-transparent'
									)}
								/>

								{/* Header Content */}
								<div className="p-5 md:p-7 flex flex-col gap-4 relative z-10">
									<div className="flex items-center justify-between">
										<div
											className={cn(
												'font-mono text-[9px] uppercase tracking-widest border px-2 py-0.5 rounded-full inline-flex',
												uc.tagStyle ?? 'text-muted-foreground border-border'
											)}
										>
											{uc.tag}
										</div>
										<span className="font-mono text-[10px] text-muted-foreground/30">
											{uc.number}
										</span>
									</div>

									<div className="space-y-2">
										<h3 className="text-xl md:text-2xl font-black tracking-tight text-foreground leading-snug whitespace-pre-line">
											{uc.title}
										</h3>
										<p className="text-sm text-muted-foreground leading-relaxed max-w-[95%]">
											{uc.description}
										</p>
									</div>

									<div className="flex flex-wrap gap-1.5">
										{uc.highlights.map((h) => (
											<span
												key={h}
												className="font-mono text-[8.5px] text-muted-foreground border border-border bg-muted/30 px-2 py-0.5 rounded-md"
											>
												{h}
											</span>
										))}
									</div>
								</div>

								{/* Visual Container - Pushed to bottom/right */}
								<div className="relative flex-1 min-h-[240px] w-full bg-muted/5 border-t border-border/50 group-hover:border-border/80 transition-colors">
									{VISUALS[i]}
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
