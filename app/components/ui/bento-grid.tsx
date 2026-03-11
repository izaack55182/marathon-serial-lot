import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/misc'

const BentoGrid = ({ children, className }: { children: ReactNode; className?: string }) => {
	return (
		<div className={cn('grid w-full auto-rows-[22rem] grid-cols-3 gap-4', className)}>
			{children}
		</div>
	)
}

const BentoCard = ({
	name,
	className,
	background,
	Icon,
	description,
	href,
	cta,
	badge,
	badgeColor,
	gradientColor,
}: {
	name: string
	className: string
	background?: ReactNode
	Icon: any
	description: string
	href?: string
	cta?: string
	badge?: string
	badgeColor?: string
	gradientColor?: string
}) => {
	// Determine gradient style based on gradientColor prop or default
	const gradientStyle = gradientColor
		? { background: `linear-gradient(to bottom right, ${gradientColor}, transparent)` }
		: {}

	return (
		<div
			key={name}
			className={cn(
				'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl',
				// Light mode styles
				'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
				// Dark mode styles
				'dark:bg-black dark:border-white/10 dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
				className
			)}
		>
			{/* Optional Gradient Background for a "Magic Card" feel if desired */}
			<div
				className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-10"
				style={gradientStyle}
			/>

			<div>{background}</div>

			<div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
				<div className="flex items-center justify-between mb-2">
					<div className="flex h-10 w-10 origin-left transform-gpu items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-neutral-700 dark:text-neutral-300 transition-all duration-300 ease-in-out group-hover:scale-75">
						{Icon}
					</div>
					{badge && (
						<span
							className={cn(
								'inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-mono font-medium',
								badgeColor
							)}
						>
							{badge}
						</span>
					)}
				</div>

				<h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">{name}</h3>
				<p className="max-w-lg text-neutral-400">{description}</p>
			</div>

			<div
				className={cn(
					'pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'
				)}
			>
				{cta && href && (
					<Button variant="ghost" asChild size="sm" className="pointer-events-auto">
						<a href={href}>
							{cta}
							<Icon name="arrow-right" className="ml-2 h-4 w-4" />
						</a>
					</Button>
				)}
			</div>

			<div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
		</div>
	)
}

export { BentoCard, BentoGrid }
