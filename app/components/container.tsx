import { cn } from '#app/utils/misc'
import React from 'react'

export interface ContainerProps extends React.ComponentPropsWithRef<'div'> {
	className?: string
	as?: React.ElementType
}

function Container({ as: Comp = 'div', ...props }: ContainerProps) {
	return (
		<Comp
			{...props}
			className={cn(
				'@container/container container mx-auto px-4 sm:px-8 lg:px-12',
				props.className,
			)}
		/>
	)
}
Container.displayName = 'Container'

export { Container }
