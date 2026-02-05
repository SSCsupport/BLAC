import { cn } from '#app/utils/misc'
import React from 'react'

export interface HeadingProps extends React.ComponentPropsWithoutRef<'h1'> {
	as?: Extract<React.ElementType, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>
	size?: 'md' | 'lg' | 'xl'
}

export function Heading({
	as: As = 'h3',
	size = As === 'h1' ? 'xl' : As === 'h2' ? 'lg' : As === 'h3' ? 'md' : 'md',
	className,
	...props
}: HeadingProps) {
	return (
		<As
			className={cn(
				'mb:mb-8 mb-4 font-serif font-bold text-balance',
				{
					'text-2xl/normal md:text-3xl/normal lg:text-4xl/normal':
						size === 'md',
					'text-3xl/normal md:text-4xl/normal lg:text-5xl/normal':
						size === 'lg',
					'text-4xl/normal md:text-5xl/normal lg:text-6xl/normal':
						size === 'xl',
				},
				className,
			)}
			{...props}
		/>
	)
}
Heading.Headline = function Headline({
	headline,
	className,
	as = 'h3',
	...props
}: Omit<React.ComponentProps<typeof Heading>, 'children'> & {
	headline: string
}) {
	return (
		<Heading
			className={cn(
				'inline box-decoration-clone',
				{
					'bg-[color-mix(in_oklab,_var(--primary)_40%,_white)] px-4 py-1':
						as === 'h1',
					'bg-white pr-2': as !== 'h1',
				},
				className,
			)}
			as={as}
			{...props}
		>
			{headline.split('\n').map((line, index) => (
				<React.Fragment key={line}>
					{index !== 0 && <br />}
					{line.trim()}
				</React.Fragment>
			))}
		</Heading>
	)
}
