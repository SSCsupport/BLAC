import { generateRemixSitemap } from '@forge42/seo-tools/remix/sitemap'
import { routes } from 'virtual:react-router/server-build'
import type { Route } from './+types/sitemap.xml'

export async function loader({ request }: Route.LoaderArgs) {
	const sitemap = await generateRemixSitemap({
		domain: new URL(request.url).origin,
		routes: routes as never,
		ignore: ['/resources/images'],
	})

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	})
}
