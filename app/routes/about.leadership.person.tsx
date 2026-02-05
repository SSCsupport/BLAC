import { BodyText } from '#app/components/cms/body-text.tsx'
import { Heading } from '#app/components/cms/heading.tsx'
import { Section } from '#app/components/cms/section.tsx'
import { Container } from '#app/components/container.tsx'
import { Image } from '#app/components/image.tsx'
import { leadershipTeam } from '#app/content/leadership.tsx'
import { makeBreadcrumbHandle } from '#app/utils/breadcrumbs.ts'
import { getImgPlaceholders } from '#app/utils/img.server.ts'
import { href } from 'react-router'
import type { Route } from './+types/about.leadership.person'

export async function loader({ params }: Route.LoaderArgs) {
	const person = leadershipTeam.find((person) => person.slug === params.slug)
	if (!person) {
		throw new Response('Not Found', { status: 404 })
	}

	let srcs: Record<string, string> = {}
	srcs[`leadership-${params.slug}`] = person.image.src

	const placholders = await getImgPlaceholders(srcs)

	return { placholders, person }
}

export const handle = makeBreadcrumbHandle(({ loaderData }) => [
	{
		label: 'About',
		to: href('/about'),
	},
	{
		label: 'Leadership',
		to: `${href('/about')}#leadership`,
	},
	{
		label: loaderData.person.name,
		to: href('/about/leadership/:slug', { slug: loaderData.person.slug }),
	},
])

export default function Component({ loaderData }: Route.ComponentProps) {
	return (
		<>
			<Section paddingBottom="none" className="bg-gray-50">
				<Container>
					<div className="flex flex-col-reverse lg:flex-row">
						<div className="relative z-10 flex-1 pt-8 pb-16 lg:mt-0">
							<p className="border-primary w-fit border-l-4 bg-white pl-2 text-base/none uppercase">
								{loaderData.person.role}
							</p>
							<div className="mt-2 text-3xl lg:w-3/2">
								<Heading.Headline headline={loaderData.person.name} as="h2" />
							</div>
						</div>
						<Image
							src={loaderData.person.image.src}
							alt={loaderData.person.image.alt}
							width={500}
							height={500}
							placeholder={
								loaderData.placholders[`leadership-${loaderData.person.slug}`]
							}
							params={{ hq: 'true' }}
							className="border-secondary border lg:-mb-16"
							fit="cover"
						/>
					</div>
				</Container>
			</Section>

			<Section>
				<Container>
					<BodyText>{loaderData.person.content}</BodyText>
				</Container>
			</Section>
		</>
	)
}
