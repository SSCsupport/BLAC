import { Container } from '#app/components/container.tsx'
import { Image } from '#app/components/image.tsx'
import { cn } from '#app/utils/misc.tsx'
import { BodyText } from '../../body-text'
import { Heading } from '../../heading'

export function FeatureFour({
	title,
	body,
	image,
	reverse,
	className,
}: {
	title: string
	body: React.ReactNode
	image: {
		src: string
		alt: string
		width?: number
		height?: number
		placeholder?: string
		className?: string
	}
	reverse?: boolean
	className?: string
}) {
	return (
		<Container className={className}>
			<div className="grid gap-16 lg:grid-cols-2">
				<div
					className={cn({
						'lg:order-1': reverse,
					})}
				>
					<Heading as="h2">{title}</Heading>
					<BodyText className="mt-4" muted>
						{body}
					</BodyText>
				</div>
				<Image
					src={image.src}
					alt={image.alt}
					width={image.width ?? 700}
					height={image.height ?? 700}
					placeholder={image.placeholder}
					className="justify-self-end"
					params={{ objectFit: 'inside' }}
				/>
			</div>
		</Container>
	)
}
