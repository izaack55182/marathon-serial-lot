import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { ARCHITECTURE_POINTS } from '../constants'
import { EdgeActivity } from './edge-activity'

export function Architecture() {
	return (
		<section
			id="architecture"
			className="w-full border-t border-border bg-background px-4 py-12 md:py-32 overflow-hidden"
		>
			<div className="mx-auto max-w-6xl">
				<div className="grid md:grid-cols-2 gap-12 md:gap-12 items-stretch md:min-h-[500px]">
					{/* Left: copy */}
					<div className="flex flex-col gap-4 z-10">
						<div className="space-y-3">
							<p className="font-mono text-xs uppercase tracking-[4px] text-muted-foreground/60">
								Infraestructura Distribuida
							</p>
							<h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
								Tu aplicación vivirá en el <span className="text-orange-400">Edge Global.</span>
							</h2>
						</div>
						<p className="max-w-xl text-muted-foreground text-lg leading-relaxed mix-blend-plus-lighter text-shadow-sm">
							Tu aplicación vivirá en el Edge Global. <br className="hidden md:block" />
							Cada ruta se ejecutará como un Worker nativo. <br className="hidden md:block" />
							Tus usuarios recibirán respuestas instantáneas desde el nodo más cercano, sin tocar un
							servidor central.
						</p>
						<ul className="flex flex-col gap-3 mt-4">
							{ARCHITECTURE_POINTS.map((item) => (
								<li key={item} className="flex items-center gap-3 text-sm text-foreground/80">
									<div className="h-1.5 w-1.5 rounded-full bg-orange-500 flex-shrink-0 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
									{item}
								</li>
							))}
						</ul>
						<div className="pt-4">
							<Button
								variant="outline"
								size="sm"
								className="gap-2 text-xs rounded-full h-8 px-4 bg-background/50 backdrop-blur-sm hover:bg-background/80"
							>
								<Icon name="globe" size="sm" className="text-foreground" />
								Explorar la red
							</Button>
						</div>
					</div>

					<EdgeActivity />
				</div>
			</div>
		</section>
	)
}
