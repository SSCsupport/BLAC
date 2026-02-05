import { generateRobotsTxt } from '@forge42/seo-tools/robots'
import type { Route } from './+types/robots.txt'

export async function loader({ request }: Route.LoaderArgs) {
	const isProductionDeployment = process.env.DEPLOYMENT_ENV === 'production'
	const domain = new URL(request.url).origin
	const robotsTxt = generateRobotsTxt([
		{
			userAgent: '*',
			sitemap: [`${domain}/sitemap.xml`],
			...(isProductionDeployment
				? {
						allow: ['/'],
						disallow: ['/contact/success', '/resources'],
					}
				: {
						disallow: ['/'],
					}),
		},
	])

	return new Response(robotsTxt, {
		headers: {
			'Content-Type': 'text/plain',
		},
	})
}
