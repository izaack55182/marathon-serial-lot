import { motion } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { cn } from '@/utils/misc'

const STATS = [
	{ value: '310+', label: 'Edge locations' },
	{ value: '0ms', label: 'Cold start' },
	{ value: '< 1 day', label: 'To production' },
	{ value: '∞', label: 'Scale' },
]

export function CTA() {
	return (
		<section className="w-full border-t border-border px-4 py-32 bg-background overflow-hidden">
			<div className="mx-auto max-w-4xl flex flex-col items-center gap-16 text-center relative">
				{/* Background grid */}
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.03]"
					style={{
						backgroundImage:
							'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
						backgroundSize: '40px 40px',
					}}
				/>

				{/* Glow orb */}
				<div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-orange-500/5 blur-3xl" />

				{/* Text */}
				<div className="relative flex flex-col items-center gap-6">
					<motion.p
						className="font-mono text-xs uppercase tracking-[4px] text-orange-500/80"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.4 }}
					>
						Open Source • En Desarrollo
					</motion.p>

					<motion.h2
						className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.05]"
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.55, delay: 0.1 }}
					>
						El futuro del stack <br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-300">
							se está construyendo.
						</span>
					</motion.h2>

					<motion.p
						className="max-w-lg text-base md:text-lg text-muted-foreground leading-relaxed"
						initial={{ opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.18 }}
					>
						Codenity Stack es 100% Open Source, pero los motores aún se están afinando. No está
						listo para producción, pero muy pronto habrá grandes noticias.
					</motion.p>
				</div>

				{/* CTAs */}
				<motion.div
					className="relative flex flex-col sm:flex-row items-center gap-3"
					initial={{ opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.25 }}
				>
					{/* Primary */}
					<Button
						size="lg"
						disabled
						className="gap-2 bg-orange-500/50 text-white/50 font-semibold px-6 rounded-lg cursor-not-allowed"
					>
						<Icon name="calendar" className="h-4 w-4" />
						Próximamente
					</Button>
				</motion.div>

				{/* Stats row */}
				<motion.div
					className="relative w-full grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border"
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.32 }}
				>
					{STATS.map((s, i) => (
						<div key={s.label} className="flex flex-col items-center gap-1 bg-card px-6 py-5">
							<span className="text-2xl font-black text-foreground tracking-tight">{s.value}</span>
							<span className="text-[11px] text-muted-foreground font-mono">
								{s.label === 'Edge locations'
									? 'Ubicaciones Edge'
									: s.label === 'Cold start'
										? 'Cold start'
										: s.label === 'To production'
											? 'A producción'
											: s.label === 'Scale'
												? 'Escala'
												: s.label}
							</span>
						</div>
					))}
				</motion.div>

				{/* Fine print */}
				<motion.p
					className="relative text-[11px] text-muted-foreground/40 font-mono"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					Sin complicaciones. Sin vendor lock-in. Código 100% libre.
				</motion.p>
			</div>
		</section>
	)
}
