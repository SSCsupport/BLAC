'use client'

import { Image } from '#app/components/image.tsx'
import { cn } from '#app/utils/misc.tsx'
import { motion, useScroll, useTransform } from 'motion/react'
import { Heading } from '../../heading'

export function ParallaxHeading({
	headline,
	className,
}: {
	headline: string
	className?: string
}) {
	const { scrollY } = useScroll()
	const y = useTransform(scrollY, (value) => value * 0.3)

	return (
		<motion.div style={{ y }} className={className}>
			<Heading.Headline headline={headline} as="h1" />
		</motion.div>
	)
}

export function ParallaxImage({
	image,
	placeholder,
}: {
	image: {
		src: string
		alt: string
		width: number
		height: number
		id: number
		gridArea: string
		scrollSpeed: number
	}
	placeholder?: string
}) {
	const { scrollY } = useScroll()
	const y = useTransform(scrollY, (value) => value * image.scrollSpeed)

	return (
		<div className={cn('min-h-0 min-w-0', image.gridArea)}>
			<motion.div style={{ y }} className="size-fit overflow-hidden">
				<Image
					src={image.src}
					alt={image.alt}
					width={image.width}
					height={image.height}
					data-id={image.id}
					className="size-full overflow-hidden object-contain"
					placeholder={placeholder}
					fetchPriority="high"
					isAboveFold
				/>
			</motion.div>
		</div>
	)
}
