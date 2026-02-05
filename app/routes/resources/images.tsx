import { getDomainUrl } from '#app/utils/misc'
import { constants, promises as fs } from 'node:fs'
import path from 'node:path'
import { getDefaultSharpPipeline, getImgResponse } from 'openimg/node'
import sharp from 'sharp'
import { z } from 'zod/v4'
import type { Route } from './+types/images'

let cacheDir: string | null = null

async function getCacheDir() {
	if (cacheDir) return cacheDir

	let dir = './tests/fixtures/openimg'
	if (process.env.NODE_ENV === 'production') {
		const isAccessible = await fs
			.access('/data', constants.W_OK)
			.then(() => true)
			.catch(() => false)

		if (isAccessible) {
			dir = '/data/images'
		} else {
			// Use /tmp for serverless environments like Vercel
			dir = '/tmp/images'
		}
	}

	return (cacheDir = dir)
}

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url)
	const searchParams = url.searchParams

	const headers = new Headers()
	headers.set('Cache-Control', 'public, max-age=31536000, immutable')

	return getImgResponse(request, {
		headers,
		allowlistedOrigins: [getDomainUrl(request)].filter(Boolean),
		cacheFolder: await getCacheDir(),
		getImgSource: () => {
			/* if (objectKey) {
				const signedUrl = getPublicAssetUrl(objectKey)
				return {
					type: 'fetch',
					url: signedUrl,
				}
			} */

			const src = searchParams.get('src')
			if (!src) {
				throw new Response('src query parameter is required', {
					status: 400,
				})
			}

			if (URL.canParse(src)) {
				// Fetch image from external URL; will be matched against allowlist
				return {
					type: 'fetch',
					url: src,
				}
			}
			// Retrieve image from filesystem (public folder)
			if (src.startsWith('/assets')) {
				// Files managed by Vite
				return {
					type: 'fs',
					path: `./app/${src.replace(/^\//, '')}`,
				}
			}

			const filePath = path.join(
				process.cwd(),
				`/public/${src.replace(/^\//, '')}`,
			)
			// Fallback to files in public folder
			return {
				type: 'fs',
				path: filePath,
			}
		},
		getSharpPipeline: ({ params, source }) => {
			const url = new URL(request.url)

			// Check for custom parameters
			const bg = url.searchParams.get('bg')
			const highQuality = url.searchParams.get('hq') === 'true'
			const { data: blur } = z.coerce
				.number()
				.safeParse(url.searchParams.get('blur'))
			const { data: position } = z
				.string()
				.safeParse(url.searchParams.get('position'))
			const { data: objectFit } = z
				.enum(['contain', 'cover', 'fill', 'inside', 'outside'])
				.safeParse(url.searchParams.get('objectFit'))

			// If no custom processing needed, use default pipeline
			if (!bg && !highQuality && !blur && !position && !objectFit) {
				return undefined
			}

			;(params as any).fit ??= objectFit

			// Build custom pipeline
			let pipeline: sharp.Sharp
			// Track applied effects to build unique cache key suffix
			let cacheKeySuffix = ''

			if (highQuality) {
				// Start with high-quality pipeline
				pipeline = sharp().autoOrient()

				if (params.width && params.height) {
					pipeline.resize(params.width, params.height, {
						fit: params.fit,
						kernel: sharp.kernel.lanczos3, // Higher quality resampling
						position,
						background: { r: 0, g: 0, b: 0, alpha: 0 },
					})
					if (params.fit === 'contain') {
						cacheKeySuffix += `-fit-${params.fit}`
					}
					if (position) {
						cacheKeySuffix += `-pos-${position.replace(' ', '-')}`
					}
				}

				pipeline.sharpen()

				// High-quality format settings
				if (params.format === 'webp') {
					pipeline.webp({ quality: 90 })
				} else if (params.format === 'avif') {
					pipeline.avif({ quality: 85 })
				}

				// Add to cache key to differentiate from standard quality
				cacheKeySuffix += '-hq'
			} else if (position || objectFit) {
				pipeline = sharp().autoOrient()
				pipeline.resize(params.width, params.height, {
					fit: params.fit,
					position: position ?? sharp.strategy.attention,
					background: { r: 0, g: 0, b: 0, alpha: 0 },
				})
				if (params.fit === 'contain') {
					cacheKeySuffix += `-fit-${params.fit}`
				}
				if (position) {
					cacheKeySuffix += `-pos-${position.replace(' ', '-')}`
				}
			} else {
				// Start with default pipeline for other effects
				pipeline = getDefaultSharpPipeline(params)
			}

			if (bg) {
				// Flatten image against background color
				const color = bg === 'white' ? '#ffffff' : bg
				pipeline.flatten({ background: color })
				// Include background color in cache key for uniqueness
				cacheKeySuffix += `-bg-${bg}`
			}

			return {
				pipeline,
				// Combine source identifier with processing parameters for unique cache key
				cacheKey: `${getCacheKeyFromSource(source)}${cacheKeySuffix}`,
			}
		},
	})
}

function getCacheKeyFromSource(source: any): string {
	if (source.type === 'fs') return source.path
	if (source.type === 'fetch') return source.url
	return source.cacheKey
}
