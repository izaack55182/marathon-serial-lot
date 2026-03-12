// CORE

// UTILS
import { cva } from 'class-variance-authority'
import { Link } from 'react-router'
import { cn } from '@/utils/misc'
// COMPONENTS
import { useTheme, type ColorScheme } from '@/routes/resource/color-scheme'

type LogoProps = {
	redirect?: string
	className?: string
	variant: 'long' | 'icon'
	theme?: ColorScheme
	alt?: string
}

export const logoVariants = cva('', {
	variants: {
		variant: {
			long: 'w-40 h-auto',
			icon: 'size-7',
		},
	},
})

export default function Logo({ redirect, className, variant, alt, theme }: LogoProps) {
	const preferredColorScheme = useTheme()
	const finalTheme = theme ?? preferredColorScheme

	// Fallback to 'long' if 'icon' assets are missing
	const logoVariant = variant === 'icon' ? 'long' : variant
	const themeSuffix = finalTheme === 'dark' ? 'dark' : 'light'

	return (
		<Link to={redirect ? redirect : '/'}>
			<img
				decoding="sync"
				className={cn(logoVariants({ variant }), 'transition-none', className)}
				alt={alt ? alt : 'Marathon Logo'}
				src={`/images/logo/codenity-${logoVariant}-${themeSuffix}.svg`}
				width={variant === 'icon' ? 28 : 160}
				height={variant === 'icon' ? 28 : 40}
			/>
		</Link>
	)
}
