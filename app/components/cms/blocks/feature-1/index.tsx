import { Container } from '#app/components/container.tsx'
import { Image } from '#app/components/image.tsx'
import { cn } from '#app/utils/misc.tsx'
import { BodyText } from '../../body-text'
import { Heading } from '../../heading'

export function FeatureOne({
	title,
	body,
	image,
	className,
}: {
	title: string
	body: React.ReactNode
	image: {
		src: string
		alt: string
		width: number
		height: number
		placeholder?: string
		className?: string
	}
	className?: string
}) {
	return (
		<Container className={className}>
			<div className="grid gap-16 md:gap-32">
				<div className="flex flex-col gap-4">
					<Heading as="h2">{title}</Heading>
					<BodyText>{body}</BodyText>
				</div>
				<div>
					<Image
						src={image.src}
						alt={image.alt}
						width={image.width}
						height={image.height}
						placeholder={image.placeholder}
						className={cn('object-contain', image.className)}
					/>
				</div>
			</div>
		</Container>
	)
}
