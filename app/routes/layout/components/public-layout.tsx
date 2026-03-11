// app/layouts/public-layout.tsx

import { Footer } from '@/routes/layout/components/footer'

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-1 pt-16">{children}</main>
			<Footer />
		</div>
	)
}
