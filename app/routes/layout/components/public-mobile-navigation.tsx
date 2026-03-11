import { useState } from 'react'
import { Link } from 'react-router'
import { ColorSchemeSwitch } from '@/components/color-scheme-switch'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'

import Logo from './logo'

export function MobileNavigation() {
	const [open, setOpen] = useState(false)

	const menuItems = [
		{ label: 'Inicio', href: '/', icon: 'house' as const },
		{ label: 'Experiencia DX', href: '#developer-experience', icon: 'code' as const },
		{ label: 'Casos de Uso', href: '#use-cases', icon: 'rocket' as const },
		{ label: 'Stack Features', href: '#features', icon: 'zap' as const },
		{ label: 'Backend & Data', href: '#backend', icon: 'layers' as const },
		{ label: 'Arquitectura', href: '#architecture', icon: 'globe' as const },
	]

	return (
		<div className="md:hidden">
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="size-11 rounded-2xl hover:bg-muted/50 border border-transparent active:border-border/50 transition-all"
					>
						<Icon name="menu" className="size-6 text-foreground" />
						<span className="sr-only">Abrir menú</span>
					</Button>
				</SheetTrigger>
				<SheetContent
					side="right"
					className="w-[300px] sm:w-[380px] bg-background/60 backdrop-blur-3xl border-l border-border/40 p-0 flex flex-col"
				>
					{/* Background Accents */}
					<div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-[100px] pointer-events-none -mr-32 -mt-32 rounded-full" />
					<div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[100px] pointer-events-none -ml-32 -mb-32 rounded-full" />

					<SheetHeader className="p-8 text-left border-b border-border/10 relative z-10">
						<div className="flex items-center justify-between">
							<Logo variant="long" className="w-32" />
							<div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/30">
								v7.13
							</div>
						</div>
					</SheetHeader>

					<nav className="flex-1 overflow-y-auto p-6 relative z-10">
						<div className="flex flex-col gap-1.5">
							{menuItems.map((item) => (
								<Link
									key={item.label}
									to={item.href}
									onClick={() => setOpen(false)}
									className="flex items-center gap-4 px-4 py-4 rounded-2xl group hover:bg-foreground/[0.03] active:scale-[0.98] border border-transparent hover:border-border/10"
								>
									<div className="size-10 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-sky-500/10 group-hover:text-sky-400">
										<Icon
											name={item.icon}
											className="size-5 transition-transform duration-300 group-hover:scale-110"
										/>
									</div>
									<span className="font-bold text-lg tracking-tight group-hover:text-foreground">
										{item.label}
									</span>
								</Link>
							))}
						</div>
					</nav>

					<div className="p-8 mt-auto border-t border-border/10 bg-muted/20 relative z-10">
						<div className="flex items-center justify-between">
							<div className="flex flex-col gap-0.5">
								<span className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">
									Visualizer
								</span>
								<span className="font-bold text-sm text-foreground/80">Apariencia</span>
							</div>
							<ColorSchemeSwitch />
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}
