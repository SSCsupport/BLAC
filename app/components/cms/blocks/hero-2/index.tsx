import { Container } from '#app/components/container.tsx'
import { Image } from '#app/components/image.tsx'
import { BodyText } from '../../body-text'
import { Heading } from '../../heading'

export function HeroTwo({
	title,
	headline,
	body,
	image,
	className,
}: {
	title: string
	headline: string
	body: React.ReactNode
	image: {
		src: string
		alt: string
		width?: number
		height?: number
		placeholder?: string
		className?: string
	}
	className?: string
}) {
	return (
		<Container className={className}>
			<h1 className="sr-only">{title}</h1>
			<div className="flex flex-col-reverse lg:flex-row lg:gap-16">
				<div className="relative z-10 -mt-8 flex-1 pb-16 lg:mt-0 lg:pt-8">
					<div className="text-3xl lg:w-3/2">
						<Heading.Headline headline={headline} as="h2" size="lg" />
					</div>
					<BodyText className="mt-4" muted>
						{body}
					</BodyText>
				</div>
				<div className="relative ml-auto min-h-96 w-4/5 flex-1 lg:-mb-8 lg:max-h-132">
					<Image
						src={image.src}
						alt={image.alt}
						width={image.width ?? 800}
						height={image.height ?? 800}
						placeholder={image.placeholder}
						className="absolute inset-0 size-full object-cover"
						params={{ hq: 'true', objectFit: 'inside' }}
					/>
				</div>
			</div>
		</Container>
	)
}
