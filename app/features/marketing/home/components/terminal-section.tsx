import { motion } from 'motion/react'
import { Icon } from '@/components/ui/icon'
import { AnimatedSpan, Terminal, TypingAnimation } from '@/components/ui/terminal'
import { DX_ITEMS } from '../constants'

export function TerminalSection() {
	return (
		<section id="terminal" className="w-full border-t border-border px-4 py-12 md:py-24">
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-100px' }}
				transition={{
					duration: 0.8,
					ease: 'easeOut',
					delay: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : 0,
				}}
				className="mx-auto max-w-6xl"
			>
				<div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
					{/* Terminal */}
					<Terminal className="shadow-2xl order-last md:order-first bg-card">
						<TypingAnimation className="text-muted-foreground">
							&gt; bunx create-codenity my-app
						</TypingAnimation>

						<AnimatedSpan delay={1500} className="text-sky-400">
							<span>◆ Codenity Stack v1.0.0</span>
						</AnimatedSpan>

						<AnimatedSpan delay={2000} className="text-muted-foreground/60">
							<span>┌ Select a template</span>
						</AnimatedSpan>

						<AnimatedSpan delay={2500} className="text-emerald-400">
							<span>│ ● Full-stack (RR7 + Hono)</span>
						</AnimatedSpan>

						<AnimatedSpan delay={3000} className="text-muted-foreground/60">
							<span>│ ○ API Only</span>
						</AnimatedSpan>

						<AnimatedSpan delay={3500} className="text-muted-foreground/60">
							<span>└</span>
						</AnimatedSpan>

						<AnimatedSpan delay={4000} className="text-emerald-400">
							<span>✓ Cloning template</span>
						</AnimatedSpan>

						<AnimatedSpan delay={4500} className="text-emerald-400">
							<span>✓ Installing with bun</span>
						</AnimatedSpan>

						<AnimatedSpan delay={5000} className="text-emerald-400">
							<span>✓ Configuring Workers</span>
						</AnimatedSpan>

						<AnimatedSpan delay={5500} className="text-emerald-400">
							<span>✓ TypeScript routes ready</span>
						</AnimatedSpan>

						<AnimatedSpan delay={6000} className="text-foreground">
							<span>
								Done! <span className="text-muted-foreground">Run: </span>
								<span className="text-emerald-400">cd my-app && bun dev</span>
							</span>
						</AnimatedSpan>
					</Terminal>

					{/* Copy */}
					<div className="flex flex-col gap-5">
						<p className="font-mono text-xs uppercase tracking-[3px] text-muted-foreground">
							Experiencia de Desarrollador
						</p>
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
							De la idea a <span className="text-emerald-400">producción</span> en minutos.
						</h2>
						<p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
							Un solo comando para empezar. Un solo comando para desplegar. Enrutamiento, tipos y
							configuración de edge incluidos.
						</p>
						<div className="grid grid-cols-2 gap-3 mt-2">
							{DX_ITEMS.map((item) => (
								<div
									key={item.label}
									className="flex items-center gap-2 text-xs text-muted-foreground"
								>
									<Icon name={item.icon} className="size-3.5 text-emerald-400" />
									{item.label}
								</div>
							))}
						</div>
					</div>
				</div>
			</motion.div>
		</section>
	)
}
