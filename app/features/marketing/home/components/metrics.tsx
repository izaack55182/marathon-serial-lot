import { NumberTicker } from '@/components/ui/number-ticker'
import { METRICS } from '../constants'

export function Metrics() {
	return (
		<section className="w-full border-y border-border bg-muted/30">
			<div className="mx-auto grid max-w-5xl grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
				{METRICS.map((m) => (
					<div
						key={m.label}
						className="flex flex-col items-center justify-center gap-1 px-8 py-10 text-center"
					>
						<span className="font-mono text-4xl font-bold tracking-tight text-foreground tabular-nums">
							{/* NumberTicker animates the count-up on mount */}
							<NumberTicker value={m.value} />
							{m.suffix}
						</span>
						<span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
							{m.label}
						</span>
					</div>
				))}
			</div>
		</section>
	)
}
