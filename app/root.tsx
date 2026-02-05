import {
	data,
	Links,
	Meta,
	Outlet,
	ScrollRestoration,
	useLoaderData,
} from 'react-router'

import type { Route } from './+types/root'
import appleTouchIconAssetUrl from './assets/favicons/apple-touch-icon.png'
import faviconAssetUrl from './assets/favicons/favicon.svg'
import { Breadcrumbs } from './components/breadcrumbs.tsx'
import { BodyText } from './components/cms/body-text.tsx'
import { Heading } from './components/cms/heading.tsx'
import { Container } from './components/container.tsx'
import { GeneralErrorBoundary } from './components/error-boundry'
import { OpenImgContextProvider } from './components/image.tsx'
import { Footer } from './routes/layout/footer.tsx'
import { Header } from './routes/layout/header.tsx'
import tailwindStyleSheetUrl from './styles/tailwind.css?url'
import { useHandleBreadcrumbs } from './utils/breadcrumbs.ts'
import { getEnv } from './utils/env.server'
import { getDomainUrl, getImgSrc } from './utils/misc'

export const links: Route.LinksFunction = () => [
	{
		rel: 'icon',
		href: '/favicon.ico',
		sizes: '48x48',
	},
	{ rel: 'icon', type: 'image/svg+xml', href: faviconAssetUrl },
	{ rel: 'apple-touch-icon', sizes: '180x180', href: appleTouchIconAssetUrl },
	{
		rel: 'manifest',
		href: '/site.webmanifest',
		crossOrigin: 'use-credentials',
	} as const,
	{
		rel: 'preconnect',
		href: 'https://fonts.googleapis.com',
	},
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'use-credentials',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap',
	},
	// Preload svg sprite as a resource to avoid render blocking
	// { rel: 'preload', href: iconsHref, as: 'image' },
	{ rel: 'preload', href: tailwindStyleSheetUrl, as: 'style' },
	{ rel: 'stylesheet', href: tailwindStyleSheetUrl },
]

export async function loader({ request }: Route.LoaderArgs) {
	return data({
		requestInfo: {
			origin: getDomainUrl(request),
			path: new URL(request.url).pathname,
		},
		ENV: getEnv(),
	})
}

function Document({
	children,
	env = {},
}: {
	children: React.ReactNode
	env?: Record<string, string | undefined>
}) {
	return (
		<html lang="en">
			<head>
				<Meta />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Links />
			</head>
			<body className="bg-background text-foreground flex min-h-svh flex-col">
				{children}
				<script
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(env)}`,
					}}
				/>
				<ScrollRestoration />
			</body>
		</html>
	)
}

export function Layout({ children }: { children: React.ReactNode }) {
	// if there was an error running the loader, data could be missing
	const data = useLoaderData<typeof loader | null>()
	const breadcrumbs = useHandleBreadcrumbs()

	return (
		<Document env={data?.ENV}>
			<OpenImgContextProvider
				optimizerEndpoint="/resources/images"
				getSrc={getImgSrc}
			>
				<Header />

				<main className="relative grow">
					{!!breadcrumbs.length && (
						<div className="absolute top-4 left-0 w-full">
							<Container>
								<Breadcrumbs items={breadcrumbs} />
							</Container>
						</div>
					)}

					{children}
				</main>

				<Footer />
			</OpenImgContextProvider>
		</Document>
	)
}

export default function App() {
	return <Outlet />
}

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				404: () => (
					<>
						<Heading>Page Not Found</Heading>
						<BodyText>
							<p>Sorry, we can’t seem to find the page you are looking for.</p>
							<p>Please try:</p>
							<ul>
								<li>checking if the web address you entered was correct</li>
								<li>browsing from the main menu</li>
							</ul>
						</BodyText>
					</>
				),
			}}
		/>
	)
}
