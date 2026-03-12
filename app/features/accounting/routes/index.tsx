import type { MetaFunction } from 'react-router'
import { createDomain, getMeta } from '@/utils/misc'

export async function loader({ request }: { request: Request }) {
	const origin = createDomain(request)
	return { origin }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	const origin = data?.origin ?? 'https://marathon-serial-lot.pages.dev'
	return getMeta({
		origin,
		title: 'Contabilidad',
		description: 'Gestión financiera en Marathon.',
		noIndex: true,
	})
}

export default function Accounting() {
	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold">Contabilidad</h1>
			<p className="text-muted-foreground">Módulo de gestión contable y financiera.</p>
		</div>
	)
}
