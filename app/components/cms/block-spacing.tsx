import { cn } from '#app/utils/misc'
import { Slot as SlotPrimitive } from 'radix-ui'
import React from 'react'

export type VerticalPaddingOptions = 'large' | 'medium' | 'none'

type BlockSpacingProps = {
	top?: VerticalPaddingOptions
	bottom?: VerticalPaddingOptions
	children: React.ReactNode
	className?: string
	asChild?: boolean
}

export const BlockSpacing = ({
	top = 'medium',
	bottom = 'medium',
	className,
	children,
	asChild,
}: BlockSpacingProps) => {
	const Comp = asChild ? SlotPrimitive.Slot : 'div'
	return (
		<Comp
			className={cn(
				{
					'scroll-mt-48 pt-24 lg:pt-36': top === 'large',
					'scroll-mt-32 pt-16 lg:pt-24': top === 'medium',
					'pb-24 lg:pb-36': bottom === 'large',
					'pb-16 lg:pb-24': bottom === 'medium',
				},
				className,
			)}
		>
			{children}
		</Comp>
	)
}
