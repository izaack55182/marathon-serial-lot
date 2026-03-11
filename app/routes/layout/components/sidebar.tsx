import { NavLink, useLocation } from 'react-router'
import { Icon } from '@/components/ui/icon'
import type { IconName } from '@/components/ui/icons/types'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { ColorSchemeSwitch } from '@/components/color-scheme-switch'
import { cn } from '@/utils/misc'

interface NavItem {
	label: string
	href: string
	icon: IconName
	items?: { label: string; href: string }[]
}

const NAV_SECTIONS: { title: string; items: NavItem[] }[] = [
	{
		title: 'Application',
		items: [
			{ label: 'Consultas', href: '/c/consultas', icon: 'search' },
		],
	},
]

export default function AppSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
	const location = useLocation()

	return (
		<Sidebar className={className} variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" className="hover:bg-transparent cursor-pointer h-12 px-0 rounded-md">
							<div className="h-7 w-auto flex items-center justify-center shrink-0">
								<img src="/images/logo/marathon-group-logo.png" alt="Marathon" className="h-full w-auto object-contain rounded-sm" />
							</div>
							<div className="flex flex-col gap-0 leading-none overflow-hidden ml-2">
								<span className="font-semibold text-[14.5px] text-foreground truncate">Marathon Group</span>
								<span className="text-[12px] text-muted-foreground truncate">Enterprise</span>
							</div>
							<Icon name="chevron-down" className="ml-auto size-4 text-muted-foreground/70 shrink-0" />
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				{NAV_SECTIONS.map((section) => (
					<SidebarGroup key={section.title} className="group-data-[collapsible=icon]:hidden">
						<SidebarGroupLabel className="text-[13px] font-medium text-muted-foreground/50 px-0 h-8 mt-2 mb-1">{section.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu className="gap-2.5">
								{section.items.map((item) => {
									const isActive = location.pathname.startsWith(item.href) && (item.href !== '/' || location.pathname === '/')
									return (
										<SidebarMenuItem key={item.href}>
											<SidebarMenuButton
												asChild
												isActive={isActive}
												tooltip={item.label}
												className={cn(
													"h-[30px] px-0 hover:bg-transparent hover:text-foreground hover:opacity-100 data-[active=true]:bg-transparent transition-all",
													isActive
														? "font-medium text-foreground opacity-100"
														: "text-muted-foreground font-normal opacity-80"
												)}
											>
												<NavLink to={item.href}>
													<div className={cn("flex items-center justify-center size-6 rounded-md mr-1.5 transition-colors", isActive ? "text-primary" : "text-muted-foreground/70 group-hover:text-foreground")}>
														<Icon
															name={item.icon}
															className="size-4"
														/>
													</div>
													<span className="text-[14.5px] leading-tight">{item.label}</span>
												</NavLink>
											</SidebarMenuButton>

											{item.items && (
												<SidebarMenuSub>
													{item.items.map((sub) => {
														const isSubActive = location.pathname.includes(sub.href)
														return (
															<SidebarMenuSubItem key={sub.href}>
																<SidebarMenuSubButton asChild isActive={isSubActive}>
																	<NavLink to={sub.href}>
																		<span>{sub.label}</span>
																	</NavLink>
																</SidebarMenuSubButton>
															</SidebarMenuSubItem>
														)
													})}
												</SidebarMenuSub>
											)}
										</SidebarMenuItem>
									)
								})}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem className="flex flex-col gap-3 pt-4 pb-2 border-t border-sidebar-border/30">
						<SidebarMenuButton size="lg" className="w-full px-0 hover:bg-transparent data-[state=open]:bg-transparent transition-colors cursor-pointer">
							<div className="size-8 rounded-full overflow-hidden border-2 border-primary/20 bg-primary/10 flex items-center justify-center shrink-0">
								<Icon name="users" className="size-4 text-primary" />
							</div>
							<div className="flex flex-col gap-0.5 leading-none overflow-hidden text-left ml-2">
								<span className="font-bold text-[14px] truncate text-foreground uppercase tracking-tight">Administrador</span>
								<span className="text-[10px] font-medium text-muted-foreground/60 truncate uppercase">Panel de Control</span>
							</div>
							<Icon name="chevrons-up-down" className="ml-auto size-4 text-muted-foreground shrink-0" />
						</SidebarMenuButton>

						<div className="w-full flex items-center justify-between px-1">
							<span className="text-xs font-medium text-muted-foreground">Tema visual</span>
							<ColorSchemeSwitch />
						</div>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
