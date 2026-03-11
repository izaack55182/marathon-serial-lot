import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { RetroGrid } from '@/components/ui/retro-grid'
import { STACK_PILLS } from '../constants'

export function Hero() {
	return (
		<section className="relative flex min-h-svh w-full flex-col items-center justify-center pb-6 px-4 text-center overflow-hidden">
			{/* Background grid - Hidden on mobile to prevent GPU flicker */}
			<RetroGrid className="opacity-40 transition-none hidden md:block" />
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-[1] transition-none" />

			<div className="relative z-10 flex flex-col items-center gap-6 lg:gap-8 max-w-7xl mx-auto">
				{/* Version badge */}
				<Badge
					variant="secondary"
					className="gap-2 rounded-full px-5 py-2 text-sm cursor-pointer hover:bg-muted border-border/50 transition-none"
				>
					<span className="h-1.5 w-1.5 rounded-full bg-orange-400 md:animate-pulse shadow-[0_0_8px_2px_rgba(249,115,22,0.5)]" />
					En Desarrollo • Building in Public
					<Icon name="arrow-right" className="h-3 w-3" />
				</Badge>

				{/* Headline */}
				<h1 className="text-5xl md:text-6xl lg:text-[90px] font-black tracking-tighter leading-[0.9] text-foreground">
					Crea <span className="text-sky-400">experiencias</span>
					<br />
					digitales de <span className="text-emerald-400">alto nivel.</span>
				</h1>

				{/* Subtext */}
				<p className="max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
					Impulsado por el open-source{' '}
					<span className="text-foreground font-black tracking-tight underline decoration-sky-400/30 decoration-2 underline-offset-4">
						Codenity Stack
					</span>
					. Potenciado por herramientas modernas para convertir tu visión en una realidad global e
					instantánea.
				</p>

				{/* CTAs */}
				<div className="flex flex-col sm:flex-row gap-4 mt-2">
					<Button
						size="lg"
						disabled
						className="h-14 px-12 rounded-xl gap-2 text-base font-bold bg-primary/40 text-primary-foreground/40 border border-primary/10 shadow-none cursor-not-allowed"
					>
						Accesible Próximamente
					</Button>
				</div>

				{/* Stack icons - Vibrant & Larger */}
				<div className="flex flex-col items-center gap-6 lg:gap-12 mt-12 lg:mt-18">
					<span
						className="text-[22px] font-mono italic text-muted-foreground/60"
						style={{ fontVariationSettings: '"CASL" 1, "CRSV" 1' }}
					>
						Creado con:
					</span>
					<div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 lg:gap-16 px-4 max-w-5xl">
						{STACK_PILLS.map((pill) => (
							<div
								key={pill.label}
								className="group relative flex flex-col items-center gap-3 transition-transform duration-300 hover:scale-110"
							>
								<div className="relative z-10 brightness-110 dark:brightness-125">
									<img
										src={pill.logo}
										alt={pill.label}
										className="w-8 h-8 md:w-12 md:h-12 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
										width={48}
										height={48}
									/>
								</div>

								{/* Minimal Tooltip/Label */}
								<span className="text-[10px] font-black uppercase tracking-[1px] text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity">
									{pill.label}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
