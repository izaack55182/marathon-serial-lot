import { useCallback, useEffect, useRef } from 'react'
import { flushSync } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { cn } from '@/utils/misc'

interface AnimatedThemeSwitcherProps {
	colorScheme: 'light' | 'dark' | 'system'
	resolvedTheme: 'light' | 'dark'
	onChange: (newScheme: 'light' | 'dark' | 'system') => void
	className?: string
}

function useThemeTransition(resolvedTheme: 'light' | 'dark', onChange: (newScheme: 'light' | 'dark' | 'system') => void) {
	const isTransitioning = useRef(false)

	useEffect(() => {
		if (typeof document !== 'undefined' && 'startViewTransition' in document) {
			document.documentElement.style.viewTransitionName = 'root'
		}
	}, [])

	const handleThemeChange = useCallback(async (newScheme: 'light' | 'dark' | 'system', e: React.MouseEvent) => {
		if (isTransitioning.current) return

		const newResolvedTheme = newScheme === 'system'
			? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
			: newScheme

		const isChangingTheme = newResolvedTheme !== resolvedTheme

		if (
			!isChangingTheme ||
			!document.startViewTransition ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			onChange(newScheme)
			return
		}

		isTransitioning.current = true

		try {
			document.documentElement.classList.add('no-transitions')

			const transition = document.startViewTransition(() => {
				document.documentElement.classList.remove('dark', 'light')
				document.documentElement.classList.add(newResolvedTheme)
				flushSync(() => {
					onChange(newScheme)
				})
			})

			await transition.ready

			const x = e.clientX ?? window.innerWidth / 2
			const y = e.clientY ?? window.innerHeight / 2
			const right = window.innerWidth - x
			const bottom = window.innerHeight - y
			const maxRadius = Math.hypot(Math.max(x, right), Math.max(y, bottom))

			document.documentElement.animate(
				{
					clipPath: [
						`circle(0px at ${x}px ${y}px)`,
						`circle(${maxRadius}px at ${x}px ${y}px)`,
					],
				},
				{
					duration: 400,
					easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
					pseudoElement: '::view-transition-new(root)',
				}
			)

			await transition.finished
		} catch {
			onChange(newScheme)
		} finally {
			document.documentElement.classList.remove('no-transitions')
			isTransitioning.current = false
		}
	}, [resolvedTheme, onChange])

	return handleThemeChange
}

export const ThemeToggleButton = ({
	colorScheme,
	resolvedTheme,
	onChange,
	className,
}: AnimatedThemeSwitcherProps) => {
	const handleThemeChange = useThemeTransition(resolvedTheme, onChange)
	const isDark = resolvedTheme === 'dark'

	return (
		<Button
			variant={colorScheme !== 'system' ? 'secondary' : 'ghost'}
			size="icon"
			className={cn('rounded-full relative size-10', className)}
			onClick={(e) => handleThemeChange(isDark ? 'light' : 'dark', e)}
		>
			<Icon
				name="sun"
				className={cn(
					'h-5 w-5 transition-all duration-500 ease-in-out',
					isDark ? 'rotate-180 scale-0 opacity-0 absolute' : 'rotate-0 scale-100 opacity-100'
				)}
			/>
			<Icon
				name="moon"
				className={cn(
					'h-5 w-5 transition-all duration-500 ease-in-out',
					isDark ? 'rotate-0 scale-100 opacity-100' : 'rotate-180 scale-0 opacity-0 absolute'
				)}
			/>
			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}

export const ThemeSystemButton = ({
	colorScheme,
	resolvedTheme,
	onChange,
	className,
}: AnimatedThemeSwitcherProps) => {
	const handleThemeChange = useThemeTransition(resolvedTheme, onChange)

	return (
		<Button
			variant={colorScheme === 'system' ? 'secondary' : 'ghost'}
			size="icon"
			className={cn('rounded-full size-10', className)}
			onClick={(e) => handleThemeChange('system', e)}
		>
			<Icon name="laptop" className="h-5 w-5" />
			<span className="sr-only">System theme</span>
		</Button>
	)
}

// Componente completo (por si se necesita fuera del dock)
export const AnimatedThemeSwitcher = ({
	colorScheme,
	resolvedTheme,
	onChange,
	className,
}: AnimatedThemeSwitcherProps) => {
	return (
		<div className={cn('flex items-center gap-1', className)}>
			<ThemeToggleButton
				colorScheme={colorScheme}
				resolvedTheme={resolvedTheme}
				onChange={onChange}
			/>
			<ThemeSystemButton
				colorScheme={colorScheme}
				resolvedTheme={resolvedTheme}
				onChange={onChange}
			/>
		</div>
	)
}