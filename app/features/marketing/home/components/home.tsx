import { Architecture } from './architecture'
import { BackendChoice } from './backend-choice'
import { CTA } from './cta'
import { DatabaseChoice } from './database-choice'
import { DeveloperExperience } from './developer-experience'
import { Features } from './features'
import { Hero } from './hero'
import { Metrics } from './metrics'
import { TerminalSection } from './terminal-section'
import { UseCases } from './use-cases'

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function Home() {
	return (
		<div className="relative w-full flex flex-col items-center bg-background">
			<Hero />
			<Metrics />
			<DeveloperExperience />
			<UseCases />
			<Features />
			<BackendChoice />
			<DatabaseChoice />
			<Architecture />
			<TerminalSection />
			<CTA />
		</div>
	)
}
