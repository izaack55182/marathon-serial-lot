import { Link } from 'react-router'
import { ColorSchemeSwitchManual, ColorSchemeSwitchSystem } from '@/components/color-scheme-switch'
import { buttonVariants } from '@/components/ui/button'
import { Dock, DockIcon } from '@/components/ui/dock'
import { Icon } from '@/components/ui/icon'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/utils/misc'
import Logo from './logo'
import { MobileNavigation } from './public-mobile-navigation'

export function Header() {
	return (
		<header className="fixed top-0 w-full z-50 pointer-events-none">
			{/* --- DESKTOP DOCK --- */}
			<div className="hidden md:flex w-full items-center justify-center">
				<div className="pointer-events-auto">
					<TooltipProvider>
						<Dock
							direction="middle"
							gap={6}
							className="bg-background/60 backdrop-blur-xl border border-border/40 shadow-2xl rounded-full px-4"
						>
							{/* --- HOME --- */}
							<DockIcon>
								<Tooltip>
									<TooltipTrigger asChild>
										<Link
											to="/"
											className={cn(
												buttonVariants({ variant: 'ghost', size: 'icon' }),
												'rounded-full size-10'
											)}
										>
											<Icon name="house" size="md" className="text-foreground" />
										</Link>
									</TooltipTrigger>
									<TooltipContent side="bottom">
										<p>Inicio</p>
									</TooltipContent>
								</Tooltip>
							</DockIcon>

							<Separator orientation="vertical" className="h-6 self-center" />
							{/* --- DX --- */}
							<DockIcon>
								<Tooltip>
									<TooltipTrigger asChild>
										<a
											href="#developer-experience"
											className={cn(
												buttonVariants({ variant: 'ghost', size: 'icon' }),
												'rounded-full size-10'
											)}
										>
											<Icon name="code" size="md" className="text-foreground" />
										</a>
									</TooltipTrigger>
									<TooltipContent side="bottom">
										<p>Experiencia DX</p>
									</TooltipContent>
								</Tooltip>
							</DockIcon>

							{/* --- CASOS DE USO --- */}
							<DockIcon>
								<Tooltip>
									<TooltipTrigger asChild>
										<a
											href="#use-cases"
											className={cn(
												buttonVariants({ variant: 'ghost', size: 'icon' }),
												'rounded-full size-10'
											)}
										>
											<Icon name="rocket" size="md" className="text-foreground" />
										</a>
									</TooltipTrigger>
									<TooltipContent side="bottom">
										<p>Casos de Uso</p>
									</TooltipContent>
								</Tooltip>
							</DockIcon>

							{/* --- HERRAMIENTAS --- */}
							<DockIcon>
								<Tooltip>
									<TooltipTrigger asChild>
										<a
											href="#features"
											className={cn(
												buttonVariants({ variant: 'ghost', size: 'icon' }),
												'rounded-full size-10'
											)}
										>
											<Icon name="zap" size="md" className="text-foreground" />
										</a>
									</TooltipTrigger>
									<TooltipContent side="bottom">
										<p>Stack Features</p>
									</TooltipContent>
								</Tooltip>
							</DockIcon>

							{/* --- SOBRE EL STACK --- */}
							<DockIcon>
								<Tooltip>
									<TooltipTrigger asChild>
										<a
											href="#backend"
											className={cn(
												buttonVariants({ variant: 'ghost', size: 'icon' }),
												'rounded-full size-10'
											)}
										>
											<Icon name="layers" size="md" className="text-foreground" />
										</a>
									</TooltipTrigger>
									<TooltipContent side="bottom">
										<p>Backend & Data</p>
									</TooltipContent>
								</Tooltip>
							</DockIcon>

							{/* --- ARQUITECTURA --- */}
							<DockIcon>
								<Tooltip>
									<TooltipTrigger asChild>
										<a
											href="#architecture"
											className={cn(
												buttonVariants({ variant: 'ghost', size: 'icon' }),
												'rounded-full size-10'
											)}
										>
											<Icon name="globe" size="md" className="text-foreground" />
										</a>
									</TooltipTrigger>
									<TooltipContent side="bottom">
										<p>Arquitectura</p>
									</TooltipContent>
								</Tooltip>
							</DockIcon>

							<Separator orientation="vertical" className="h-6 mx-2" />
							{/* --- DASHBOARD --- */}
							<DockIcon>
								<Tooltip>
									<TooltipTrigger asChild>
										<Link
											to="/login"
											className={cn(
												buttonVariants({ variant: 'ghost', size: 'icon' }),
												'rounded-full size-10'
											)}
										>
											<Icon name="layout-dashboard" size="md" className="text-foreground" />
										</Link>
									</TooltipTrigger>
									<TooltipContent side="bottom">
										<p>Dashboard</p>
									</TooltipContent>
								</Tooltip>
							</DockIcon>

							<Separator orientation="vertical" className="h-6 mx-1" />

							{/* --- THEME --- */}
							<DockIcon>
								<Tooltip>
									<TooltipTrigger asChild>
										<ColorSchemeSwitchManual />
									</TooltipTrigger>
									<TooltipContent side="bottom">
										<p>Tema</p>
									</TooltipContent>
								</Tooltip>
							</DockIcon>

							<DockIcon>
								<Tooltip>
									<TooltipTrigger asChild>
										<ColorSchemeSwitchSystem />
									</TooltipTrigger>
									<TooltipContent side="bottom">
										<p>Sistema</p>
									</TooltipContent>
								</Tooltip>
							</DockIcon>
						</Dock>
					</TooltipProvider>
				</div>
			</div>

			<div className="md:hidden flex items-center justify-between w-full h-16 px-6 bg-background/80 backdrop-blur-lg border-b border-border/10 pointer-events-auto">
				<Logo variant="long" className="h-10 w-auto" />
				<MobileNavigation />
			</div>
		</header>
	)
}
