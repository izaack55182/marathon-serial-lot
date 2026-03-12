import * as React from 'react'
import { useNavigate, useSearchParams } from 'react-router'
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
import { data, type MetaFunction } from 'react-router'
import { getMeta } from '@/utils/misc'
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
import { toast } from 'sonner'
import { initEnv } from '@/utils/env.server'
interface SAPItem {
	NodeRecepción: string
	NodeInventario: string
	Sucursal: string
	LoteSerie: string
	Almacén: string
	Ubicación: string
	UM: string
	CantidadaRecibir?: number
	Type_3: string
}

interface ODataResponse {
	'@odata.context'?: string
	value: SAPItem[]
}


export async function loader({ request, context }: Route.LoaderArgs) {
	const env = context?.env ?? initEnv()
	const ACUMATICA_USERNAME = env.ACUMATICA_USERNAME
	const ACUMATICA_PASSWORD = env.ACUMATICA_PASSWORD

	const url = new URL(request.url)
	const q = url.searchParams.get('q')

	if (!q) {
		return data({
			items: [],
			origin: new URL(request.url).origin
		}, {
			headers: {
				"Cache-Control": "public, s-maxage=3600, stale-while-revalidate=60"
			}
		})
	}

	if (!ACUMATICA_USERNAME || !ACUMATICA_PASSWORD) {
		console.warn("⚠️ ACUMATICA_USERNAME o ACUMATICA_PASSWORD no están definidos")
		return data({
			items: [],
			origin: new URL(request.url).origin
		})
	}

	const odataUrl = `https://acumatica.marathongroup.mx/MarathonDB/OData/MARATHON/Recepciones-Lotes-Detalle?$filter=NodeRecepci%C3%B3n%20eq%20%27${q}%27`
	const auth = btoa(`${ACUMATICA_USERNAME}:${ACUMATICA_PASSWORD}`)

	try {
		const response = await fetch(odataUrl, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Authorization': `Basic ${auth}`,
			}
		})

		if (!response.ok) {
			console.error(`Error OData API (${response.status})`)
			return data({
				items: [],
				error: `Error ${response.status}`,
				origin: new URL(request.url).origin
			})
		}

		const result: ODataResponse = await response.json()
		return data({
			items: result.value || [],
			origin: new URL(request.url).origin
		})
	} catch (error) {
		console.error("🔥 Error crítico en el Loader OData:", error)
		return data({
			items: [],
			origin: new URL(request.url).origin
		})
	}
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	const origin = data?.origin ?? 'https://marathon-serial-lot.pages.dev'

	return getMeta({
		title: 'Consultas',
		description: 'Consulta de Lote - Serie en Marathon.',
		origin,
		noIndex: true,
	})
}

export default function ConsultasPage({ loaderData }: Route.ComponentProps) {
	const { items } = loaderData
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()
	const [open, setOpen] = React.useState(false)
	const [searchValue, setSearchValue] = React.useState('')
	const currentQuery = searchParams.get('q') || ''
	const [recentSearches, setRecentSearches] = React.useState<string[]>([])

	// Cargar historial al montar
	React.useEffect(() => {
		const saved = localStorage.getItem('recent_inventory_searches')
		if (saved) {
			try {
				setRecentSearches(JSON.parse(saved))
			} catch (e) {
				console.error('Error loading history', e)
			}
		}
	}, [])

	const addToHistory = (query: string) => {
		const trimmed = query.trim()
		if (!trimmed) return

		setRecentSearches(prev => {
			const filtered = prev.filter(s => s !== trimmed)
			const updated = [trimmed, ...filtered].slice(0, 5) // Limitamos a 5
			localStorage.setItem('recent_inventory_searches', JSON.stringify(updated))
			return updated
		})
	}

	const [selectedRows, setSelectedRows] = React.useState<Record<string, boolean>>({})

	const isAllSelected = items.length > 0 && items.every(item => selectedRows[item.LoteSerie])
	const isSomeSelected = items.some(item => selectedRows[item.LoteSerie]) && !isAllSelected

	const toggleAll = () => {
		if (isAllSelected) {
			setSelectedRows({})
		} else {
			const all: Record<string, boolean> = {}
			items.forEach(item => {
				all[item.LoteSerie] = true
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
			if ((e.key?.toLowerCase() === 'k') && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen((open) => !open)
			}
		}
		window.addEventListener('keydown', down)
		return () => window.removeEventListener('keydown', down)
	}, [])

	// Notificar si no hay resultados
	React.useEffect(() => {
		if (currentQuery && items.length === 0) {
			toast.error(`No se encontraron resultados para "${currentQuery}"`, {
				description: 'Verifique el código de recepción e intente de nuevo.',
				duration: 5000,
			})
		}
	}, [currentQuery, items.length])

	const EmptyState = () => (
		<div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in zoom-in-95 duration-500">
			<div className="bg-primary/5 p-6 rounded-full mb-6">
				<Icon name="search" className="size-12 text-primary/40 stroke-[1.5]" />
			</div>
			<h3 className="text-2xl font-bold text-foreground mb-2">Comience una consulta</h3>
			<p className="text-muted-foreground max-w-[400px] mb-8">
				Ingrese un código de recepción de Acumatica para visualizar los detalles y generar códigos QR.
			</p>
			<Button
				variant="outline"
				onClick={() => setOpen(true)}
				className="rounded-xl px-8 h-12 border-muted-foreground/20 hover:bg-muted/50"
			>
				<kbd className="mr-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
					<span className="text-xs">⌘</span>K
				</kbd>
				Presione para buscar
			</Button>
		</div>
	)

	return (
		<div className="flex flex-col min-h-screen bg-background">
			{/* Command Dialog */}
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput
					placeholder="Ingrese código de recepción (Ej: QRC04269) y presione Enter..."
					value={searchValue}
					onValueChange={setSearchValue}
					onKeyDown={(e) => {
						if (e.key === 'Enter' && searchValue.trim()) {
							setOpen(false)
							addToHistory(searchValue.trim())
							navigate(`?q=${searchValue.trim()}`)
						}
					}}
				/>
				<CommandList>
					<CommandEmpty>Presione Enter para buscar "{searchValue}" en Acumatica.</CommandEmpty>

					{recentSearches.length > 0 && (
						<CommandGroup heading="Búsquedas recientes">
							{recentSearches.map((s) => (
								<CommandItem
									key={s}
									onSelect={() => {
										setOpen(false)
										setSearchValue(s)
										navigate(`?q=${s}`)
									}}
								>
									<Icon name="refresh-ccw" className="mr-2 h-4 w-4 text-muted-foreground" />
									<span>{s}</span>
								</CommandItem>
							))}
						</CommandGroup>
					)}

					<CommandGroup heading="Artículos">
						{items.map((item) => (
							<CommandItem key={item.LoteSerie} onSelect={() => setOpen(false)}>
								<Icon name="package" className="mr-2 h-4 w-4" />
								<span>{item.LoteSerie} - {item.Type_3}</span>
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
								{currentQuery ? `Buscar: ${currentQuery}` : 'Buscar'}
							</div>
							<div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
								<kbd className="flex h-5 select-none items-center gap-1 rounded bg-background border border-border px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm">
									<span className="text-xs">⌘</span>K
								</kbd>
							</div>
						</div>
					</div>

					<div className="flex items-center justify-end gap-3 lg:col-span-1">
						{Object.values(selectedRows).some(Boolean) && (
							<Button
								onClick={() => {
									const selectedItemsData = items.filter(i => selectedRows[i.LoteSerie])
									generateInventoryPDF(selectedItemsData)
								}}
								className="bg-primary hover:bg-primary/90 active:scale-95 active:bg-primary/80 text-primary-foreground rounded-xl h-11 px-6 shadow-lg shadow-primary/20 transition-all font-bold text-xs uppercase tracking-wider animate-in fade-in slide-in-from-right-4"
							>
								<Icon name="file-down" className="mr-2 size-4" />
								Exportar PDF ({Object.values(selectedRows).filter(Boolean).length})
							</Button>
						)}
					</div>
				</div>
			</div>

			{/* Table Content Section */}
			<div className="p-6 lg:p-10 -mt-6 flex-1">
				<div className="max-w-[1600px] mx-auto h-full">
					{!currentQuery ? (
						<Card className="border-none shadow-2xl shadow-foreground/5 overflow-hidden bg-card/80 backdrop-blur-md rounded-[24px] h-full flex items-center justify-center min-h-[400px]">
							<EmptyState />
						</Card>
					) : (
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
											<TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground py-5">Lote / Serie</TableHead>
											<TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground px-4">Node Inv.</TableHead>
											<TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground px-4">Sucursal</TableHead>
											<TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground px-4">Almacén</TableHead>
											<TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground px-4 text-center">Ubicación</TableHead>
											<TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground px-4 text-center">Cant. Recibir</TableHead>
											<TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground px-4">UM</TableHead>
											<TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground px-4">Descripción</TableHead>
											<TableHead className="text-[11px] font-black uppercase tracking-wider text-muted-foreground text-center w-[80px]">Acción</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{items.map((item) => {
											const isSelected = !!selectedRows[item.LoteSerie]
											return (
												<TableRow
													key={item.LoteSerie}
													className={cn(
														"group border-b border-border/40 transition-all cursor-pointer",
														isSelected ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/30"
													)}
													onClick={() => toggleRow(item.LoteSerie)}
												>
													<TableCell className="py-5 px-6 text-center" onClick={(e) => e.stopPropagation()}>
														<Checkbox
															className="rounded-md h-4.5 w-4.5"
															checked={isSelected}
															onCheckedChange={() => toggleRow(item.LoteSerie)}
														/>
													</TableCell>
													<TableCell className="py-5 px-4">
														<span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight uppercase font-mono">{item.LoteSerie}</span>
													</TableCell>
													<TableCell className="text-[11px] font-bold text-muted-foreground px-4 uppercase tracking-tighter whitespace-nowrap">{item.NodeInventario}</TableCell>
													<TableCell className="text-[11px] font-bold text-muted-foreground px-4 uppercase tracking-tighter whitespace-nowrap">{item.Sucursal}</TableCell>
													<TableCell className="text-[11px] font-bold text-foreground/70 px-4 uppercase truncate">{item.Almacén}</TableCell>
													<TableCell className="text-[11px] font-bold text-foreground/70 px-4 text-center uppercase tracking-tighter">
														<code className="bg-muted px-2 py-0.5 rounded">{item.Ubicación}</code>
													</TableCell>
													<TableCell className="text-center px-4 font-mono font-bold text-primary">
														{item.CantidadaRecibir}
													</TableCell>
													<TableCell className="text-[11px] font-bold text-foreground tracking-tight px-4 text-center">
														{item.UM}
													</TableCell>
													<TableCell className="text-[11px] font-medium text-muted-foreground/80 px-4 whitespace-nowrap">
														{item.Type_3}
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
					)}
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
										<p className="text-[10px] font-black uppercase text-muted-foreground/50 tracking-widest mb-1">Descripción / Tipo</p>
										<p className="text-sm font-bold text-foreground leading-tight">{itemToView.Type_3}</p>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<p className="text-[10px] font-black uppercase text-muted-foreground/50 tracking-widest mb-1">Cód. Recepción</p>
											<p className="text-xs font-mono font-bold text-primary">{itemToView.NodeRecepción}</p>
										</div>
										<div>
											<p className="text-[10px] font-black uppercase text-muted-foreground/50 tracking-widest mb-1">Lote / Serie (QR)</p>
											<p className="text-xs font-mono font-bold text-foreground">{itemToView.LoteSerie}</p>
										</div>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-3">
									<div className="p-3 rounded-lg bg-muted text-center">
										<p className="text-[9px] font-bold text-muted-foreground/60 uppercase mb-0.5">Sucursal</p>
										<p className="text-[11px] font-bold text-foreground truncate">{itemToView.Sucursal}</p>
									</div>
									<div className="p-3 rounded-lg bg-muted text-center">
										<p className="text-[9px] font-bold text-muted-foreground/60 uppercase mb-0.5">Almacén / Ubic.</p>
										<p className="text-[11px] font-bold text-foreground truncate">{itemToView.Almacén} - {itemToView.Ubicación}</p>
									</div>
								</div>

								<div className="p-3 rounded-lg bg-primary/5 border border-primary/10 flex justify-between items-center text-center">
									<div className="flex-1 border-r border-primary/10">
										<p className="text-[9px] font-bold text-primary/60 uppercase mb-0.5">Cantidad</p>
										<p className="text-sm font-black text-primary">{itemToView.CantidadaRecibir}</p>
									</div>
									<div className="flex-1">
										<p className="text-[9px] font-bold text-primary/60 uppercase mb-0.5">U. Medida</p>
										<p className="text-sm font-black text-primary">{itemToView.UM}</p>
									</div>
								</div>
							</div>

							<div className="pt-4">
								<ItemQRCode itemId={itemToView.LoteSerie} itemTitle={itemToView.Type_3} />
							</div>
						</div>
					)}
				</SheetContent>
			</Sheet>
		</div>
	)
}
