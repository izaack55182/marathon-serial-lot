import { cn } from '@/utils/misc'

import { LIGHTS, TOWERS } from '../constants'

function DotTower({ height, mobileHeight }: { height: number; mobileHeight: number }) {
	return (
		<div className="flex flex-col-reverse items-center gap-[4px] flex-1">
			{Array.from({ length: height }).map((_, i) => (
				<div
					key={i}
					className={cn(
						'w-[3.5px] h-[3.5px] rounded-full flex-shrink-0 bg-neutral-300 dark:bg-white/30',
						i >= mobileHeight && 'hidden md:block'
					)}
					style={{ opacity: Math.max(0.1, 1 - (i / height) * 0.85) }}
				/>
			))}
		</div>
	)
}

export function EdgeActivity() {
	const totalCols = TOWERS.length

	return (
		<div className="relative w-full h-full min-h-[380px] md:min-h-[580px] rounded-2xl border border-border/40 bg-neutral-100 dark:bg-[#080808] overflow-hidden">
			{/* Vignette */}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#f5f5f5_95%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_40%,#080808_95%)] pointer-events-none z-20" />

			{/* Top fade */}
			<div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-neutral-100 to-transparent dark:from-[#080808] pointer-events-none z-20" />

			{/* Bottom glow line */}
			<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent z-10" />

			{/* Torres de dots — fondo */}
			<div className="absolute bottom-[-2px] left-4 right-4 flex items-end justify-between z-0">
				{TOWERS.map((t, i) => {
					// Si el height > 40, reducimos el exceso un 50% en móvil
					const mobileH = t.height > 40 ? 40 + (t.height - 40) * 0.5 : t.height
					return (
						<div key={i} className={cn('flex-1 px-[1px]', i % 2 !== 0 && 'hidden sm:flex')}>
							<DotTower height={t.height} mobileHeight={Math.floor(mobileH)} />
						</div>
					)
				})}
			</div>

			{/* Luces naranjas flotantes — encima */}
			<div className="absolute bottom-[-2px] left-4 right-4 flex items-end justify-between z-10 pointer-events-none">
				{TOWERS.map((tower, colIndex) => {
					const light = LIGHTS.find((l) => l.col === colIndex)
					if (!light)
						return (
							<div
								key={colIndex}
								className={cn('flex-1 px-[1px]', colIndex % 2 !== 0 && 'hidden sm:flex')}
							/>
						)

					if (colIndex % 2 !== 0) {
						return <div key={colIndex} className="hidden sm:flex flex-1" />
					}

					// Cada dot ocupa ~7px (3px dot + 4px gap)
					const riseHeight = tower.height * 7
					const mobileRise = (tower.height > 40 ? 40 + (tower.height - 40) * 0.5 : tower.height) * 7

					return (
						<div key={colIndex} className="flex-1 flex justify-center relative">
							<div
								style={{
									position: 'absolute',
									bottom: 0,
									animation: `float-light ${light.duration}s ease-in-out ${light.delay}s infinite`,
									// @ts-expect-error
									'--effective-rise': 'var(--rise-height)',
									'--rise-height': `${riseHeight}px`,
									'--rise-height-mobile': `${mobileRise}px`,
								}}
								className="[@media(max-width:768px)]:![--effective-rise:var(--rise-height-mobile)]"
							>
								{/* Halo */}
								<div
									className="rounded-full bg-orange-500/20 dark:bg-orange-400/30 blur-md absolute"
									style={{
										width: light.size * 6,
										height: light.size * 6,
										top: '50%',
										left: '50%',
										transform: 'translate(-50%, -50%)',
									}}
								/>
								{/* Core */}
								<div
									className="rounded-full bg-orange-500 dark:bg-orange-400 relative z-10"
									style={{
										width: light.size,
										height: light.size,
										boxShadow: `0 0 ${light.size * 3}px ${light.size}px rgba(249,115,22,0.8)`,
									}}
								/>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
