import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
	route('/sitemap.xml', 'routes/sitemap.xml.ts'),
	route('/robots.txt', 'routes/robots.txt.ts'),

	route('resources/images', 'routes/resources/images.tsx'),

	index('routes/home.tsx'),

	route('about', 'routes/about.tsx'),
	route('about/leadership/:slug', 'routes/about.leadership.person.tsx'),

	route('news', 'routes/news.tsx'),
] satisfies RouteConfig
