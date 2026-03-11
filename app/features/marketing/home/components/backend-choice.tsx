import { motion } from 'motion/react'
import { useState } from 'react'
import { ShineBorder } from '@/components/ui/shine-border'
import { AnimatedSpan, Terminal, TypingAnimation } from '@/components/ui/terminal'
import { cn } from '@/utils/misc'
import { BACKEND_OPTIONS } from '../constants'

// ── Code snippets ─────────────────────────────────────────────────────────────

function ReactRouterTerminal() {
	return (
		<Terminal className="w-full h-full min-h-[220px] bg-stone-50/50 dark:bg-neutral-950/50 border-0 shadow-none p-5 font-mono text-[11px] leading-relaxed">
			<div className="grid gap-y-0.5">
				<div>
					<span className="text-purple-600 dark:text-purple-400">import </span>
					<span className="text-neutral-700 dark:text-white/70">{'{ db } '}</span>
					<span className="text-purple-600 dark:text-purple-400">from </span>
					<span className="text-orange-600 dark:text-orange-300">'@/db'</span>
				</div>
				<div>
					<span className="text-purple-600 dark:text-purple-400">import </span>
					<span className="text-neutral-700 dark:text-white/70">{'{ users } '}</span>
					<span className="text-purple-600 dark:text-purple-400">from </span>
					<span className="text-orange-600 dark:text-orange-300">'@/db/schema'</span>
				</div>
				<div className="mt-3">
					<span className="text-purple-600 dark:text-purple-400">export async function </span>
					<span className="text-sky-500 dark:text-sky-300">loader</span>
					<span className="text-neutral-500 dark:text-white/50">() {'{'}</span>
				</div>
				<div className="pl-4">
					<span className="text-sky-600 dark:text-sky-400">const </span>
					<span className="text-neutral-800 dark:text-white/80">data </span>
					<span className="text-neutral-500 dark:text-white/50">= </span>
					<span className="text-purple-600 dark:text-purple-400">await </span>
					<span className="text-neutral-800 dark:text-white/80">db</span>
					<span className="text-neutral-500 dark:text-white/50">.</span>
					<span className="text-yellow-600 dark:text-yellow-300">select</span>
					<span className="text-neutral-500 dark:text-white/50">().</span>
					<span className="text-yellow-600 dark:text-yellow-300">from</span>
					<span className="text-neutral-500 dark:text-white/50">(users)</span>
				</div>
				<div className="pl-4 mt-1">
					<span className="text-purple-600 dark:text-purple-400">return </span>
					<span className="text-neutral-500 dark:text-white/50">{'{ users: data }'}</span>
				</div>
				<div>
					<span className="text-neutral-500 dark:text-white/50">{'}'}</span>
				</div>
			</div>
		</Terminal>
	)
}

function JavaTerminal() {
	return (
		<Terminal className="w-full h-full min-h-[220px] bg-stone-50/50 dark:bg-neutral-950/50 border-0 shadow-none p-5 font-mono text-[11px] leading-relaxed">
			<div className="grid gap-y-0.5">
				<div>
					<span className="text-yellow-600 dark:text-yellow-300">@RestController</span>
				</div>
				<div>
					<span className="text-yellow-600 dark:text-yellow-300">@RequestMapping</span>
					<span className="text-neutral-500 dark:text-white/50">("/api")</span>
				</div>
				<div className="mt-1">
					<span className="text-purple-600 dark:text-purple-400">class </span>
					<span className="text-sky-500 dark:text-sky-300">UserController </span>
					<span className="text-neutral-500 dark:text-white/50">{'{'}</span>
				</div>
				<div className="mt-1 pl-4">
					<span className="text-yellow-600 dark:text-yellow-300">@GetMapping</span>
					<span className="text-neutral-500 dark:text-white/50">("/users")</span>
				</div>
				<div className="pl-4">
					<span className="text-purple-600 dark:text-purple-400">List</span>
					<span className="text-neutral-500 dark:text-white/50">{'<User>'}</span>
					<span className="text-yellow-600 dark:text-yellow-300"> index</span>
					<span className="text-neutral-500 dark:text-white/50">{'() {'}</span>
				</div>
				<div className="pl-8">
					<span className="text-purple-600 dark:text-purple-400">return </span>
					<span className="text-neutral-800 dark:text-white/80">service</span>
					<span className="text-neutral-500 dark:text-white/50">.</span>
					<span className="text-yellow-600 dark:text-yellow-300">findAll</span>
					<span className="text-neutral-500 dark:text-white/50">();</span>
				</div>
				<div className="pl-4">
					<span className="text-neutral-500 dark:text-white/50">{'}'}</span>
				</div>
				<div>
					<span className="text-neutral-500 dark:text-white/50">{'}'}</span>
				</div>
			</div>
		</Terminal>
	)
}

// ── Section ───────────────────────────────────────────────────────────────────

export function BackendChoice() {
	const [hovered, setHovered] = useState<string | null>(null)

	return (
		<section
			id="backend"
			className="w-full border-t border-border px-4 py-12 md:py-24 bg-background"
		>
			<div className="mx-auto max-w-6xl flex flex-col gap-12 md:gap-16">
				{/* Header */}
				<div className="flex flex-col gap-4 max-w-xl">
					<div className="space-y-3">
						<motion.p
							className="font-mono text-xs uppercase tracking-[4px] text-muted-foreground/60"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
							transition={{ duration: 0.4 }}
						>
							Backend
						</motion.p>
						<motion.h2
							className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight"
							initial={{ opacity: 0, y: 12 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							Libertad de <span className="text-orange-500">elección.</span>
						</motion.h2>
					</div>
					<motion.p
						className="text-sm md:text-base text-muted-foreground leading-relaxed"
						initial={{ opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.15 }}
					>
						Elige el backend que mejor se adapte a tu equipo. Empieza ligero con Hono en el edge, o
						integra tus servicios de Spring Boot existentes para cargas de trabajo empresariales.
					</motion.p>
				</div>

				{/* Two cards side by side */}
				<div className="grid md:grid-cols-2 gap-4">
					{BACKEND_OPTIONS.map((opt, i) => (
						<motion.div
							key={opt.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-60px' }}
							transition={{ duration: 0.5, delay: i * 0.12 }}
							onMouseEnter={() => setHovered(opt.id)}
							onMouseLeave={() => setHovered(null)}
							className={cn(
								'relative flex flex-col rounded-xl border bg-card overflow-hidden transition-[ring] duration-300',
								opt.border,
								hovered === opt.id && `ring-1 ${opt.ring}`
							)}
						>
							{/* Glow */}
							<div
								className={cn(
									'absolute inset-0 bg-gradient-to-br pointer-events-none opacity-70',
									opt.glow,
									'to-transparent'
								)}
							/>

							{/* Shine Border */}
							<ShineBorder
								className="opacity-50 z-0"
								borderWidth={2}
								shineColor={opt.id === 'react-router' ? ['#EF4444', '#F87171'] : ['#10B981', '#34D399']}
							/>

							{/* Top: text */}
							<div className="relative flex flex-col gap-5 p-8">
								{/* Tag + badge */}
								<div className="flex items-center gap-3">
									<span
										className={cn('font-mono text-[10px] uppercase tracking-widest', opt.accent)}
									>
										{opt.tag}
									</span>
									<span
										className={cn(
											'font-mono text-[9px] border px-2 py-0.5 rounded-full',
											opt.badgeStyle
										)}
									>
										{opt.badge}
									</span>
								</div>

								{/* Large Neon Logo */}
								<div className="absolute top-10 right-2 md:right-10 pointer-events-none opacity-80 md:opacity-100">
									<img
										src={opt.logoSrc}
										alt={opt.name}
										loading="lazy"
										className="w-24 h-24 md:w-32 md:h-32 object-contain transition-all duration-500"
										style={{
											filter: `drop-shadow(0 0 15px ${opt.shadowColor}) drop-shadow(0 0 30px ${opt.shadowColor})`,
										}}
										width={128}
										height={128}
									/>
								</div>

								{/* Name */}
								<div className="flex flex-col gap-1 relative z-10 max-w-[80%]">
									<h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground whitespace-pre-line leading-tight">
										<span className={cn('block text-lg mb-1', opt.accent)}>{opt.name}</span>
										{opt.tagline}
									</h3>
									<p className="text-sm text-muted-foreground leading-relaxed mt-2">
										{opt.description}
									</p>
								</div>

								{/* Highlights grid */}
								<div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
									{opt.highlights.map((h) => (
										<div key={h} className="flex items-center gap-2 text-xs text-muted-foreground">
											<span className={cn('w-1 h-1 rounded-full flex-shrink-0', opt.dot)} />
											{h}
										</div>
									))}
								</div>
							</div>

							{/* Divider */}
							<div className="border-t border-border mx-0" />

							{/* Bottom: code visual */}
							<div className="relative bg-muted/10 min-h-[220px] flex items-stretch">
								{opt.id === 'react-router' ? <ReactRouterTerminal /> : <JavaTerminal />}
							</div>
						</motion.div>
					))}
				</div>

				{/* Bottom note */}
				<motion.p
					className="text-center text-xs text-muted-foreground/50 font-mono"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<span className="text-orange-500/80 mr-2">🚧 En Desarrollo:</span>
					Ambas opciones incluirán bindings con tipado seguro y soporte completo para Workers.
				</motion.p>
			</div>
		</section>
	)
}
