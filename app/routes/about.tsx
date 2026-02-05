import { LeadershipCard } from '#app/components/cms/blocks/feature-3/leadership-card.tsx'
import { BodyText } from '#app/components/cms/body-text.tsx'
import { Heading } from '#app/components/cms/heading.tsx'
import { Section } from '#app/components/cms/section.tsx'
import { Container } from '#app/components/container.tsx'
import { leadershipTeam } from '#app/content/leadership.tsx'
import { getImgPlaceholders } from '#app/utils/img.server.ts'
import { FeatureFour } from '../components/cms/blocks/feature-4'
import { HeroTwo } from '../components/cms/blocks/hero-2'
import type { Route } from './+types/about'

export async function loader() {
	let srcs: Record<string, string> = {}
	srcs = Object.fromEntries(
		leadershipTeam.map((person) => [
			`leadership-${person.slug}`,
			person.image.src,
		]),
	)
	srcs['hero-image-2'] = 'images/hero/image-2.png'
	const placholders = await getImgPlaceholders(srcs)
	return { placholders }
}

export default function Component({ loaderData }: Route.ComponentProps) {
	return (
		<>
			<Section paddingBottom="none" className="bg-gray-50">
				<HeroTwo
					title="About Black Lawyers Association of Cincinnati"
					headline={
						'Empowering Attorneys of Color. Advancing Justice Since 1973.'
					}
					body={
						<p>
							We empower attorneys of color and advocate for a legal system that
							reflects and serves our entire community. Through mentorship and
							advocacy, we’re shaping a stronger, fairer Cincinnati.
						</p>
					}
					image={{
						src: 'images/hero/image-2.png',
						alt: 'About the Black Lawyers Association of Cincinnati',
						placeholder: loaderData.placholders['hero-image-2'],
					}}
				/>
			</Section>

			<Section paddingTop="large">
				<FeatureFour
					title="Our Story"
					body={
						<>
							<p>
								In 1973, a group of Black attorneys in Cincinnati came together
								to build a stronger legal network and amplify the voice of
								attorneys of color. Their collaboration led to the founding of
								the Black Lawyers Association of Cincinnati.
							</p>
							<p>
								For more than fifty years, BLAC has worked to promote equity in
								the legal community, expand professional opportunities, and
								uphold fairness within the justice system.
							</p>
						</>
					}
					image={{
						src: 'images/group-photo-gala.png',
						alt: 'About the Black Lawyers Association of Cincinnati',
					}}
					reverse
				/>
			</Section>

			<Section id="leadership" className="bg-gray-100">
				<Container>
					<div>
						<Heading as="h2">Meet the Leaders</Heading>
						<BodyText>
							Volunteer leaders from across Greater Cincinnati guide BLAC’s
							mission and shape the community we serve.
						</BodyText>
					</div>
					<div className="mt-16 grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
						{leadershipTeam.map((person) => (
							<LeadershipCard
								key={person.slug}
								person={person}
								placeholder={
									loaderData.placholders[`leadership-${person.slug}`]
								}
							/>
						))}
					</div>
				</Container>
			</Section>
		</>
	)
}
