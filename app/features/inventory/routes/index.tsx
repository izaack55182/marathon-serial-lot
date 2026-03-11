import * as React from 'react'
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'
import { Icon } from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/utils/misc'
import { data } from 'react-router'
import type { Route } from './+types/index'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
} from '@/components/ui/sheet'
import ItemQRCode from '../components/item-qr-code'
import { generateInventoryPDF } from '../utils/pdf-generator'

interface SAPItem {
	ItemCode: string
	ItemName: string
	U_Sucursal?: string
	U_Departamento?: string
	U_Usuario?: string
	U_Tipo?: string
	U_Color?: string
	U_Serie?: string
}

interface ODataResponse {
	'@odata.context'?: string
	value: SAPItem[]
}

const MOCK_DATA: SAPItem[] = [
	{
		ItemCode: 'TMP-8d16cb94',
		ItemName: 'OPS-I7 Modulo OPS para pantalla interactiva',
		U_Sucursal: 'LA HARINERA',
		U_Departamento: 'SALA DE JUNTAS 1',
		U_Usuario: 'TODOS LOS USUARIOS',
		U_Tipo: 'VIDEOCONFERENCIAS',
		U_Color: 'NEGRO',
		U_Serie: 'OSOPSI711L702745J'
	},
	{
		ItemCode: 'TMP-ebca886f',
		ItemName: 'SILLA EJECUTIVA - BOCONCEPT',
		U_Sucursal: 'LA HARINERA',
		U_Departamento: 'SALA DE JUNTAS 1',
		U_Usuario: 'TODOS LOS USUARIOS',
		U_Tipo: 'PLASTICO-METAL',
		U_Color: 'BLANCO',
		U_Serie: 'SIN SERIE'
	}
]

export async function loader({ request }: Route.LoaderArgs) {
	// Para pruebas, devolvemos MOCK_DATA si no hay URL real
	const odataUrl = 'https://tu-api-sap.com/b1s/v1/Items?$select=ItemCode,ItemName&$top=50'

	try {
		// Mockeamos la respuesta por ahora si la URL es la de ejemplo
		if (odataUrl.includes('tu-api-sap.com')) {
			return data({ items: MOCK_DATA })
		}

		const response = await fetch(odataUrl, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
			}
		})
		if (!response.ok) {
			throw new Error("Error de conexion")
		}
		const result: ODataResponse = await response.json()
		return data({ items: result.value || [] })
	} catch (error) {
		console.log("Error en el Loader OData, usando fallback", error)
		return data({ items: MOCK_DATA })
	}
}

const OLD_MOCK_DATA = [
	{
		id: '1',
		name: 'OPS-I7 Modulo OPS para pantalla interactiva OneScreen con proce...',
		description: 'ONE SCREEN OPS-I7 OPS i7',
		sucursal: 'LA HARINERA',
		depto: 'SALA DE JUNTAS 1',
		usuario: 'TODOS LOS USUARIOS DE LA HARINERA',
		codigo: 'TMP-8d16cb94',
		tipo: 'VIDEOCONFERENCIAS',
		color: 'NEGRO',
		serie: 'OSOPSI711L702745J',
		status: 'active'
	},
	{
		id: '2',
		name: 'SILLA EJECUTIVA',
		description: 'BOCONCEPT SIN MODELO',
		sucursal: 'LA HARINERA',
		depto: 'SALA DE JUNTAS 1',
		usuario: 'TODOS LOS USUARIOS DE LA HARINERA',
		codigo: 'TMP-ebca886f',
		tipo: 'PLASTICO-METAL',
		color: 'BLANCO',
		serie: 'SIN SERIE',
		status: 'active'
	},
	{
		id: '3',
		name: 'SILLA EJECUTIVA',
		description: 'BOCONCEPT SIN MODELO',
		sucursal: 'LA HARINERA',
		depto: 'SALA DE JUNTAS 1',
		usuario: 'TODOS LOS USUARIOS DE LA HARINERA',
		codigo: 'TMP-81a8f1ac',
		tipo: 'PLASTICO-METAL',
		color: 'BLANCO',
		serie: 'SIN SERIE',
		status: 'active'
	},
]

export default function ConsultasPage({ loaderData }: Route.ComponentProps) {
	const { items } = loaderData
	const [open, setOpen] = React.useState(false)
	const [selectedRows, setSelectedRows] = React.useState<Record<string, boolean>>({})

	const isAllSelected = items.length > 0 && items.every(item => selectedRows[item.ItemCode])
	const isSomeSelected = items.some(item => selectedRows[item.ItemCode]) && !isAllSelected

	const toggleAll = () => {
		if (isAllSelected) {
			setSelectedRows({})
		} else {
			const all: Record<string, boolean> = {}
			items.forEach(item => {
				all[item.ItemCode] = true
			})
			setSelectedRows(all)
		}
	}

	const [itemToView, setItemToView] = React.useState<SAPItem | null>(null)

	const toggleRow = (id: string) => {
		setSelectedRows(prev => ({
			...prev,
			[id]: !prev[id]
		}))
	}

	const viewItemDetails = (item: SAPItem) => {
		setItemToView(item)
	}

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen((open) => !open)
			}
		}
		document.addEventListener('keydown', down)
		return () => document.removeEventListener('keydown', down)
	}, [])

	return (
		<div className="flex flex-col min-h-screen bg-background">
			{/* Command Dialog */}
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Artículos">
						{items.map((item) => (
							<CommandItem key={item.ItemCode} onSelect={() => setOpen(false)}>
								<Icon name="package" className="mr-2 h-4 w-4" />
								<span>{item.ItemName}</span>
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>

			{/* Header Section */}
			<div className="bg-background px-6 lg:px-10 pt-10 pb-6">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center max-w-[1600px] mx-auto">
					<div className="space-y-2 lg:col-span-1">
						<h1 className="text-4xl font-bold tracking-tight lg:text-5xl text-foreground">
							Consulta de serie
						</h1>
						<p className="text-muted-foreground font-medium text-lg lg:text-xl">
							Gestión integral de activos.
						</p>
					</div>

					<div className="flex justify-center lg:col-span-1">
						<div
							onClick={() => setOpen(true)}
							className="relative group w-full max-w-[500px] cursor-pointer"
						>
							<div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-hover:text-primary transition-colors">
								<Icon name="search" className="size-5 stroke-[2]" />
							</div>
							<div className="w-full bg-muted/40 border border-muted-foreground/10 rounded-2xl pl-12 pr-14 py-3.5 text-sm font-medium text-foreground transition-all hover:bg-muted/60 hover:border-muted-foreground/20 shadow-sm whitespace-nowrap overflow-hidden text-ellipsis">
								Buscar activos...
							</div>
							<div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
								<kbd className="flex h-5 select-none items-center gap-1 rounded bg-background border border-border px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm">
									<span className="text-xs">⌘</span>K
								</kbd>
							</div>
						</div>
					</div>

					<div className="flex items-center justify-end gap-3 lg:col-span-1">
						{Object.keys(selectedRows).length > 0 && (
							<Button
								onClick={() => {
									const selectedItemsData = items.filter(i => selectedRows[i.ItemCode])
									generateInventoryPDF(selectedItemsData)
								}}
								className="bg-primary hover:bg-primary/90 active:scale-95 active:bg-primary/80 text-white rounded-xl h-11 px-6 shadow-lg shadow-primary/20 transition-all font-bold text-xs uppercase tracking-wider animate-in fade-in slide-in-from-right-4"
							>
								<Icon name="file-down" className="mr-2 size-4 text-white" />
								Exportar PDF ({Object.keys(selectedRows).length})
							</Button>
						)}
					</div>
				</div>
			</div>

			{/* Table Content Section */}
			<div className="p-6 lg:p-10 -mt-6">
				<div className="max-w-[1600px] mx-auto">
					<Card className="border-none shadow-2xl shadow-foreground/5 overflow-hidden bg-card/80 backdrop-blur-md rounded-[24px]">
						<div className="overflow-x-auto">
							<Table>
								<TableHeader className="bg-muted/30 border-b border-border/50">
									<TableRow className="hover:bg-transparent border-none">
										<TableHead className="w-[60px] py-5 px-6 text-center">
											<Checkbox
												className="rounded-md h-4.5 w-4.5"
												checked={isAllSelected || (isSomeSelected ? 'indeterminate' : false)}
												onCheckedChange={toggleAll}
											/>
										</TableHead>
										<TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground py-5 min-w-[300px]">Mobiliario / Artículo</TableHead>
										<TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground text-right px-8">Sucursal</TableHead>
										<TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground text-right px-8">Depto.</TableHead>
										<TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground px-8">Usuario</TableHead>
										<TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground">Código</TableHead>
										<TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground text-center">Tipo</TableHead>
										<TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground text-center">Color</TableHead>
										<TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground px-8">Serie</TableHead>
										<TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground text-center w-[80px]">Acción</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{items.map((item) => {
										const isSelected = !!selectedRows[item.ItemCode]
										return (
											<TableRow
												key={item.ItemCode}
												className={cn(
													"group border-b border-border/40 transition-all cursor-pointer",
													isSelected ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/30"
												)}
												onClick={() => toggleRow(item.ItemCode)}
											>
												<TableCell className="py-5 px-6 text-center" onClick={(e) => e.stopPropagation()}>
													<Checkbox
														className="rounded-md h-4.5 w-4.5"
														checked={isSelected}
														onCheckedChange={() => toggleRow(item.ItemCode)}
													/>
												</TableCell>
												<TableCell className="py-5 max-w-[280px] overflow-hidden">
													<div className="flex flex-col gap-0.5 w-full">
														<span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight uppercase truncate">{item.ItemName}</span>
														<span className="text-[10px] font-medium text-muted-foreground/60 uppercase tracking-tight truncate">{item.ItemCode}</span>
													</div>
												</TableCell>
												<TableCell className="text-[11px] font-bold text-muted-foreground text-right px-8 uppercase tracking-tighter whitespace-nowrap">{item.U_Sucursal || 'N/A'}</TableCell>
												<TableCell className="text-[11px] font-bold text-muted-foreground text-right px-8 uppercase tracking-tighter whitespace-nowrap">{item.U_Departamento || 'N/A'}</TableCell>
												<TableCell className="text-[11px] font-bold text-foreground/70 px-8 uppercase truncate max-w-[200px]">{item.U_Usuario || 'N/A'}</TableCell>
												<TableCell>
													<code className="bg-muted text-[10px] font-bold text-muted-foreground px-2 py-0.5 rounded uppercase">
														{item.ItemCode}
													</code>
												</TableCell>
												<TableCell className="text-[11px] font-bold text-foreground/70 text-center uppercase tracking-tighter">{item.U_Tipo || 'N/A'}</TableCell>
												<TableCell className="text-center px-4">
													<div className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-muted/60 text-[9px] font-black uppercase text-muted-foreground tracking-tighter">
														{item.U_Color || 'N/A'}
													</div>
												</TableCell>
												<TableCell className="text-[11px] font-mono font-bold text-foreground tracking-tight px-8">
													{item.U_Serie || 'SIN SERIE'}
												</TableCell>
												<TableCell className="text-center px-0">
													<Button
														variant="ghost"
														size="icon"
														className="size-8 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
														onClick={(e) => {
															e.stopPropagation();
															viewItemDetails(item);
														}}
													>
														<Icon name="info" className="size-4" />
													</Button>
												</TableCell>
											</TableRow>
										)
									})}
								</TableBody>
							</Table>
						</div>
					</Card>
				</div>
			</div>
			{/* Item Details Sheet with QR */}
			<Sheet open={!!itemToView} onOpenChange={(open) => !open && setItemToView(null)}>
				<SheetContent className="sm:max-w-md border-l border-border/40 bg-card/95 backdrop-blur-xl">
					<SheetHeader className="pb-6 border-b border-border/50">
						<SheetTitle className="text-2xl font-bold tracking-tight text-foreground">
							Detalles del Activo
						</SheetTitle>
						<SheetDescription className="text-sm text-muted-foreground">
							Información detallada y generación de código QR.
						</SheetDescription>
					</SheetHeader>

					{itemToView && (
						<div className="py-6 space-y-8 overflow-y-auto max-h-[calc(100vh-180px)] pr-2 scrollbar-none">
							<div className="space-y-4">
								<div className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-3">
									<div>
										<p className="text-[10px] font-black uppercase text-muted-foreground/50 tracking-widest mb-1">Nombre del Artículo</p>
										<p className="text-sm font-bold text-foreground leading-tight">{itemToView.ItemName}</p>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<p className="text-[10px] font-black uppercase text-muted-foreground/50 tracking-widest mb-1">Código SAP</p>
											<p className="text-xs font-mono font-bold text-primary">{itemToView.ItemCode}</p>
										</div>
										<div>
											<p className="text-[10px] font-black uppercase text-muted-foreground/50 tracking-widest mb-1">Serie</p>
											<p className="text-xs font-mono font-bold text-foreground">{itemToView.U_Serie || 'N/A'}</p>
										</div>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-3">
									<div className="p-3 rounded-lg bg-muted text-center">
										<p className="text-[9px] font-bold text-muted-foreground/60 uppercase mb-0.5">Sucursal</p>
										<p className="text-[11px] font-bold text-foreground truncate">{itemToView.U_Sucursal}</p>
									</div>
									<div className="p-3 rounded-lg bg-muted text-center">
										<p className="text-[9px] font-bold text-muted-foreground/60 uppercase mb-0.5">Departamento</p>
										<p className="text-[11px] font-bold text-foreground truncate">{itemToView.U_Departamento}</p>
									</div>
								</div>
							</div>

							<div className="pt-4">
								<ItemQRCode itemId={itemToView.ItemCode} itemTitle={itemToView.ItemName} />
							</div>
						</div>
					)}
				</SheetContent>
			</Sheet>
		</div>
	)
}
