import { Form, Link, type MetaFunction } from 'react-router'
import { createDomain, getMeta } from '@/utils/misc'
import { Button } from '@/components/ui/button'

export async function loader({ request }: { request: Request }) {
	const origin = createDomain(request)
	return { origin }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	const origin = data?.origin ?? 'https://codenity-stack.pages.dev'

	return getMeta({
		title: 'Acceso',
		description: 'Ingresa a tu cuenta de Codenity Stack.',
		origin,
		noIndex: true,
	})
}

// The 'action' function is automatically picked up by the file-system router
export async function action({ request }: { request: Request }) {
	const formData = await request.formData()
	const data = Object.fromEntries(formData.entries())
	return null
}

export default function Login() {
	return (
		<div className="space-y-6">
			<div className="space-y-2 text-center">
				<h1 className="text-3xl font-extrabold tracking-tight text-foreground">Bienvenido</h1>
				<p className="text-sm text-muted-foreground/80">
					Ingresa tus credenciales para acceder al stack
				</p>
			</div>

			<Form method="post" className="space-y-4">
				<div className="space-y-2">
					<label
						htmlFor="email"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Email
					</label>
					<input
						id="email"
						name="email" // Added name attribute
						type="email"
						placeholder="m@example.com"
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					/>
				</div>
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<label
							htmlFor="password"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Password
						</label>
						<Link
							to="/forgot-password"
							className="text-sm font-medium text-primary hover:underline"
						>
							Forgot password?
						</Link>
					</div>
					<input
						id="password"
						name="password" // Added name attribute
						type="password"
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					/>
				</div>
				<Button
					type="submit"
					variant="default"
					size="lg"
					className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
				>
					<Link to="/c/dashboard">Sign In</Link>
				</Button>
			</Form>

			<div className="text-center text-sm text-muted-foreground">
				Don&apos;t have an account?{' '}
				<Link to="/register" className="underline underline-offset-4 hover:text-primary">
					Sign up
				</Link>
			</div>
		</div>
	)
}
