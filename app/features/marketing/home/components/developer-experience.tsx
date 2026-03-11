import { motion } from 'motion/react'
import { memo } from 'react'
import { Badge } from '@/components/ui/badge'

// --- Components ---

/**
 * The centerpiece: React Router Neon Logo with specific red glow.
 */
const NeonLogo = memo(function NeonLogo() {
	return (
		<div className="relative group perspective-1000">
			{/* Outer Aura - Red (Static on small screens) */}
			<motion.div
				initial={false}
				animate={{
					opacity: [0.2, 0.4, 0.2],
					scale: [0.8, 1.1, 0.8],
				}}
				transition={{
					duration: 4,
					repeat: Infinity,
					ease: 'easeInOut',
				}}
				className="absolute inset-0 bg-red-500 blur-[100px] rounded-full pointer-events-none opacity-20 hidden md:block"
			/>
			{/* Mobile Static Aura */}
			<div className="absolute inset-0 bg-red-500 blur-[80px] rounded-full pointer-events-none opacity-10 md:hidden" />

			{/* The Logo with Neon Red Glow */}
			<div className="relative flex items-center justify-center">
				{/* Secondary Glow */}
				<div className="absolute inset-0 bg-red-500/20 blur-[40px] rounded-full" />

				{/* Main Logo */}
				<div className="relative z-10 transition-transform duration-500 group-hover:scale-110 brightness-110 dark:brightness-125">
					{/* Pulsing glow only on Desktop */}
					<div className="hidden md:block">
						<motion.img
							animate={{
								filter: [
									'drop-shadow(0 0 20px rgba(239,68,68,0.4))',
									'drop-shadow(0 0 40px rgba(239,68,68,0.8))',
									'drop-shadow(0 0 20px rgba(239,68,68,0.4))',
								],
							}}
							transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
							src="/images/brands/reactrouter.svg"
							alt="React Router"
							className="h-40 w-40 sm:h-64 sm:w-64 object-contain"
						/>
					</div>
					{/* Static glow on Mobile */}
					<div className="md:hidden">
						<img
							src="/images/brands/reactrouter.svg"
							alt="React Router"
							className="h-40 w-40 object-contain drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]"
						/>
					</div>
				</div>
			</div>
		</div>
	)
})

// --- Main Section ---

export function DeveloperExperience() {
	return (
		<section
			id="developer-experience"
			className="relative w-full bg-white dark:bg-[#020202] py-12 md:py-24 lg:py-32 overflow-hidden border-t border-black/5 dark:border-white/5 transition-none"
		>
			{/* Ambient Background - Reddish tint */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.05),transparent_60%)] pointer-events-none transition-none" />

			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: '-100px' }}
				transition={{
					duration: 0.8,
					ease: 'easeOut',
					delay: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : 0,
				}}
				className="container max-w-6xl relative z-10 px-4"
			>
				<div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
					{/* --- LEFT COLUMN: Message & Metrics --- */}
					<div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-8">
						<div className="space-y-4">
							<Badge
								variant="outline"
								className="border-red-500/30 bg-red-500/10 text-red-500 px-4 py-1 font-black text-[10px] tracking-[4px] uppercase rounded-full transition-none"
							>
								Evolución en Progreso
							</Badge>
							<h2 className="text-5xl lg:text-9xl font-black tracking-tighter leading-[0.80] text-foreground dark:text-white">
								Elimina el <br />
								<span className="text-red-500/40 line-through decoration-red-500/50">
									Waterfall
								</span>
							</h2>
						</div>

						<p className="max-w-xl text-muted-foreground text-lg lg:text-xl font-medium leading-relaxed">
							Deja de bloquear la UI en cada consulta. <br />
							<span className="text-foreground dark:text-white">
								React Router 7 paraleliza todo el stack.
							</span>
						</p>

						{/* High-Contrast Metrics - Now themed for Red/Speed */}
						<div className="flex items-center gap-12 pt-8">
							<div className="flex flex-col items-center lg:items-start gap-1">
								<span className="text-[10px] font-black text-red-500/30 uppercase tracking-[2px]">
									Stacks Legacy
								</span>
								<div className="text-4xl lg:text-5xl font-black text-zinc-900/10 dark:text-white/10">
									1.4s
								</div>
							</div>
							<div className="h-12 w-px bg-zinc-200 dark:bg-white/10" />
							<div className="flex flex-col items-center lg:items-start gap-1">
								<span className="text-[10px] font-black text-red-500 uppercase tracking-[2px]">
									React Router 7
								</span>
								<div className="text-6xl lg:text-8xl font-black text-red-500 md:drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]">
									85ms
								</div>
							</div>
						</div>
					</div>

					{/* --- RIGHT COLUMN: Pure Visual Impact --- */}
					<div className="flex justify-center items-center">
						<NeonLogo />
					</div>
				</div>
			</motion.div>
		</section>
	)
}
