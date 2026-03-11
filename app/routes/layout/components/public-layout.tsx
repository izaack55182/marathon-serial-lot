// app/layouts/public-layout.tsx

import { Footer } from '@/routes/layout/components/footer'
import { Header } from './public-header'

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-1 pt-16">{children}</main>
			<Footer />
		</div>
	)
}
