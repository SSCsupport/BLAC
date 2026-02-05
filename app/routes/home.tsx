import { LogoRings } from '#app/components/cms/blocks/feature-1/logo-rings.tsx'
import { HeroOne, images } from '#app/components/cms/blocks/hero-1/index.tsx'
import { Section } from '#app/components/cms/section'
import { company } from '#app/content/common.ts'
import { leadershipTeam } from '#app/content/leadership.tsx'
import { generateMeta } from '#app/utils/generate-meta.ts'
import { getImgPlaceholders } from '#app/utils/img.server.ts'
import { FeatureOne } from '../components/cms/blocks/feature-1'
import { FeatureTwo } from '../components/cms/blocks/feature-2'
import { FeatureThree } from '../components/cms/blocks/feature-3'
import { StatsOne } from '../components/cms/blocks/stats-1'
import type { Route } from './+types/home'

export async function loader() {
	let srcs: Record<string, string> = {}
	srcs = Object.fromEntries([
		...images.map((image) => [`hero-image-${image.id}`, image.src]),
		...leadershipTeam.map((person) => [
			`leadership-${person.slug}`,
			person.image.src,
		]),
	])
	srcs['featureOne'] = 'images/group-photo-gala.png'
	const placholders = await getImgPlaceholders(srcs)
	return { placholders }
}

export function meta({ matches }: Route.MetaArgs) {
	return generateMeta({
		matches,
		title: company.fullName,
		description: company.description,
	})
}

export default function Component({ loaderData }: Route.ComponentProps) {
	return (
		<>
			<Section paddingBottom="none" paddingTop="none">
				<HeroOne
					headline={'Empowering\n Attorneys of Color'}
					placholders={loaderData.placholders}
				/>
			</Section>

			<Section className="relative overflow-hidden bg-gray-100">
				<FeatureOne
					title="Our Work"
					body={
						<>
							<p>
								The Black Lawyers Association of Cincinnati addresses the unique
								challenges faced by attorneys of color while advancing a more
								just and equitable legal system.
							</p>
							<p>
								<strong>
									Empowering Attorneys of Color. Advancing Justice Together
									Since 1973.
								</strong>
							</p>
						</>
					}
					image={{
						src: 'images/group-photo-gala.png',
						alt: 'Group photo of the Black Lawyers Association of Cincinnati at the Gala',
						width: 850,
						height: 400,
						placeholder: loaderData.placholders.featureOne,
					}}
					className="relative z-10"
				/>
				<LogoRings className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 opacity-50 max-lg:hidden lg:scale-50 xl:scale-75 2xl:scale-100" />
			</Section>

			<Section
				color="dark"
				paddingTop="large"
				className="bg-secondary text-secondary-foreground"
			>
				<StatsOne
					title="Impact in the Queen City"
					body={
						<>
							<p className="text-lg/normal font-medium sm:text-xl/normal lg:text-3xl/normal">
								"BLAC stands as a pillar of strength and advocacy in
								Cincinnati’s legal community. My focus as President is two‑fold:
								deepen engagement across generations and uplift our members and
								our city through partnership, mentorship, and advocacy."
							</p>
							<p>
								<span className="block font-medium text-gray-100 sm:font-normal">
									Adreanne Stuckey
								</span>
								<span className="mt-2 block text-sm sm:text-base">
									President, BLAC and Environmental, Health & Safety Attorney,
									GE Aerospace.
								</span>
							</p>
						</>
					}
				/>
			</Section>

			<Section className="bg-gray-100" id="memberships">
				<FeatureTwo
					title="Join the Community"
					body="Secure checkout via Stripe. Takes about 3 minutes."
				/>
			</Section>

			<Section>
				<FeatureThree
					title="Our Leadership"
					body={
						<>
							<p>
								Volunteer leaders from across Greater Cincinnati guiding BLAC’s
								mission to empower attorneys of color and advance justice.
							</p>
							<p>
								<strong>Meet the board, committee chairs, and advisors.</strong>
							</p>
						</>
					}
					placholders={loaderData.placholders}
				/>
			</Section>
		</>
	)
}
