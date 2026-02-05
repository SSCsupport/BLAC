import { company } from '#app/content/common.ts'
import {
	generateMeta as baseGenerateMeta,
	type MetaData,
} from '@forge42/seo-tools/remix/metadata'
import type { MetaDescriptor } from 'react-router'
import type { Route } from '../+types/root'
import { getImgSrc } from './misc'

export function generateMeta(
	{
		matches,
		...args
	}: Partial<MetaData> & {
		matches: Route.MetaArgs['matches']
		url?: string
	},
	additionalData?: MetaDescriptor[],
) {
	const root = matches.find(
		(m): m is Extract<typeof m, { id: 'root' }> => m?.id === 'root',
	)
	if (!root) throw new Error('Root route not found')
	if (!root.loaderData?.requestInfo) return

	const canonicalUrl = new URL(
		`${root.loaderData.requestInfo.origin}${root.loaderData.requestInfo.path}`,
	).toString()

	args.image ??= getImgSrc({
		src: '/images/blac-cover.png',
		width: 1600,
		height: 900,
		optimizerEndpoint: '/resources/images',
	})
	args.title ??= company.fullName
	args.description ??= company.description

	additionalData ??= []

	additionalData?.push({
		tagName: 'link',
		rel: 'canonical',
		href: canonicalUrl,
	})

	if (args.title) {
		additionalData.push({
			name: 'twitter:title',
			content: args.title,
		})
	}

	if (args.description) {
		additionalData.push({
			name: 'description',
			content: args.description,
		})
		additionalData.push({
			name: 'twitter:description',
			content: args.description,
		})
	}

	if (args.image) {
		additionalData.push({
			name: 'twitter:image',
			content: args.image,
		})
	}

	return baseGenerateMeta(
		{
			url: canonicalUrl,
			siteName: company.fullName,
			...args,
		} as MetaData,
		additionalData,
	)
}
