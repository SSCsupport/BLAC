import { cn } from '#app/utils/misc.tsx'

export function BodyText({
	children,
	className,
	as: As = 'div',
	muted = false,
}: {
	children: React.ReactNode
	className?: string
	as?: Extract<React.ElementType, 'div' | 'p' | 'span'>
	muted?: boolean
}) {
	return (
		<As
			className={cn(
				'prose dark:prose-invert prose-lg sm:prose-xl lg:prose-2xl text-pretty', // base
				// overrides
				{
					'text-lg sm:text-xl lg:text-2xl': !muted,
					'text-muted-foreground text-base sm:text-lg lg:text-xl': muted,
				},
				'prose-h2:font-serif prose-h3:font-serif prose-h4:font-serif prose-h5:font-serif prose-h6:font-serif',
				className,
			)}
		>
			{children}
		</As>
	)
}
