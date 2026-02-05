'use client'

import { cn } from '#app/utils/misc'
import { createContext, useContext } from 'react'
import { BlockSpacing, type VerticalPaddingOptions } from './block-spacing'

type SectionColor = 'light' | 'dark'

export const BackgroundColorContext = createContext<SectionColor>('light')

export const useBackgroundColor = (): SectionColor =>
	useContext(BackgroundColorContext)

interface SectionProps {
	color?: SectionColor
	paddingTop?: VerticalPaddingOptions
	paddingBottom?: VerticalPaddingOptions
	className?: string
	children?: React.ReactNode
	id?: string
	as?: React.ElementType
}

export const Section = ({
	id,
	className,
	children,
	paddingTop,
	paddingBottom,
	color = 'light',
	as: Comp = 'section',
}: SectionProps) => {
	return (
		<BlockSpacing top={paddingTop} bottom={paddingBottom} asChild>
			<Comp
				id={id}
				className={cn(
					'bg-background text-foreground',
					{
						dark: color === 'dark',
					},
					className,
				)}
			>
				<BackgroundColorContext.Provider value={color}>
					{children}
				</BackgroundColorContext.Provider>
			</Comp>
		</BlockSpacing>
	)
}
