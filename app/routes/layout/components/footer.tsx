import { Link } from 'react-router'

export function Footer() {
	return (
		<footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-12">
			<div className="container mx-auto px-4 flex flex-col items-center gap-8">
				{/* Navigation */}
				<div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-muted-foreground/60">
					<Link to="/#features" className="hover:text-foreground transition-colors">
						Features
					</Link>
					<Link to="/#backend" className="hover:text-foreground transition-colors">
						Backend
					</Link>
					<Link to="/#database" className="hover:text-foreground transition-colors">
						Database
					</Link>
					<Link to="/#use-cases" className="hover:text-foreground transition-colors">
						Use Cases
					</Link>
				</div>

				{/* Brand & Copyright */}
				<div className="flex flex-col items-center gap-2 text-center">
					<div className="h-px w-8 bg-border mb-2" />
					<p className="text-[10px] uppercase tracking-widest text-muted-foreground/40">
						Marathon Group © 2026
					</p>
				</div>
			</div>
		</footer>
	)
}
