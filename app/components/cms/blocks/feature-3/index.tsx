import { Container } from '#app/components/container'
import { Button } from '#app/components/ui/button.tsx'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	useCarousel,
} from '#app/components/ui/carousel.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { Separator } from '#app/components/ui/separator.tsx'
import { leadershipTeam } from '#app/content/leadership.tsx'
import { href, Link } from 'react-router'
import { BodyText } from '../../body-text'
import { Heading } from '../../heading'
import { LeadershipCard } from './leadership-card'

export function FeatureThree({
	title,
	body,
	placholders,
	className,
}: {
	title: string
	body: React.ReactNode
	placholders: { [K in `leadership-${string}`]?: string }
	className?: string
}) {
	return (
		<Container className={className}>
			<div>
				<Heading as="h2">{title}</Heading>
				<BodyText>{body}</BodyText>
			</div>

			<Carousel className="mt-16">
				<div className="flex items-center justify-between gap-4">
					<CustomCarouselButtons />
					<Separator className="flex-1" />
					<Button variant="secondary" size="lg" asChild>
						<Link to={`${href('/about')}#leadership`}>See All Leaders</Link>
					</Button>
				</div>
				<CarouselContent className="mt-12 -ml-16">
					{leadershipTeam.map((person) => (
						<CarouselItem
							key={person.name}
							className="basis-full pl-16 @xl:basis-1/2 @5xl:basis-1/3"
						>
							<LeadershipCard
								person={person}
								placeholder={placholders[`leadership-${person.slug}`]}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</Container>
	)
}

function CustomCarouselButtons() {
	const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()

	return (
		<div className="flex">
			<Button
				data-slot="carousel-previous"
				variant="outline"
				size="icon-lg"
				disabled={!canScrollPrev}
				onClick={scrollPrev}
				className="border-secondary"
			>
				<Icon name="caret-down" className="size-6 rotate-90" />
				<span className="sr-only">Previous slide</span>
			</Button>
			<Button
				data-slot="carousel-next"
				variant="outline"
				size="icon-lg"
				disabled={!canScrollNext}
				onClick={scrollNext}
				className="border-secondary -ml-px"
			>
				<Icon name="caret-down" className="size-6 -rotate-90" />
				<span className="sr-only">Next slide</span>
			</Button>
		</div>
	)
}
