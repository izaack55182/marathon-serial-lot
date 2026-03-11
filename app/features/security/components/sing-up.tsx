import { Link, type MetaFunction } from 'react-router'
import { createDomain, getMeta } from '@/utils/misc'

export async function loader({ request }: { request: Request }) {
	const origin = createDomain(request)
	return { origin }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	const origin = data?.origin ?? 'https://codenity-stack.pages.dev'

	return getMeta({
		title: 'Registro',
		description: 'Crea tu cuenta en Codenity Stack.',
		origin,
		noIndex: true,
	})
}

export default function Register() {
	return (
		<div className="space-y-6">
			<div className="space-y-2 text-center">
				<h1 className="text-3xl font-extrabold tracking-tight text-foreground">Crear cuenta</h1>
				<p className="text-sm text-muted-foreground/80">Empieza a construir tu visión hoy mismo</p>
			</div>

			<form className="space-y-4">
				<div className="space-y-2">
					<label
						htmlFor="email"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Email
					</label>
					<input
						id="email"
						type="email"
						placeholder="m@example.com"
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="password"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Password
					</label>
					<input
						id="password"
						type="password"
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					/>
				</div>
				<button
					type="submit"
					className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
				>
					Create account
				</button>
			</form>

			<div className="text-center text-sm text-muted-foreground">
				Already have an account?{' '}
				<Link to="/login" className="underline underline-offset-4 hover:text-primary">
					Sign in
				</Link>
			</div>
		</div>
	)
}
