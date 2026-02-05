import { cva as baseCva } from 'class-variance-authority'
import clsx, { type ClassValue } from 'clsx'
import { defaultGetSrc, type GetSrcArgs } from 'openimg/react'
import * as React from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const cva: typeof baseCva = (...args1) => {
	const resolver = baseCva(...args1)
	return (...args2) => twMerge(resolver(...args2))
}

export function getDomainUrl(request: Request) {
	const host =
		request.headers.get('X-Forwarded-Host') ??
		request.headers.get('host') ??
		new URL(request.url).host
	const protocol = request.headers.get('X-Forwarded-Proto') ?? 'http'
	return `${protocol}://${host}`
}

export function getImgSrc({
	height,
	optimizerEndpoint,
	src,
	width,
	fit,
	format,
	params,
}: GetSrcArgs) {
	// We customize getImgSrc so our src looks nice like this:
	// /resources/images?objectKey=...&h=...&w=...&fit=...&format=...
	// instead of this:
	// /resources/images?src=%2Fresources%2Fimages%3FobjectKey%3D...%26w%3D...%26h%3D...
	if (src.startsWith(optimizerEndpoint)) {
		const [endpoint, query] = src.split('?')
		const searchParams = new URLSearchParams(query)
		searchParams.set('h', height.toString())
		searchParams.set('w', width.toString())
		if (fit) {
			searchParams.set('fit', fit)
		}
		if (format) {
			searchParams.set('format', format)
		}
		return `${endpoint}?${searchParams.toString()}`
	}

	return defaultGetSrc({
		height,
		optimizerEndpoint,
		src,
		width,
		fit,
		format,
		params,
	})
}

export function getErrorMessage(error: unknown) {
	if (typeof error === 'string') return error
	if (
		error &&
		typeof error === 'object' &&
		'message' in error &&
		typeof error.message === 'string'
	) {
		return error.message
	}
	console.error('Unable to get error message for error', error)
	return 'Unknown Error'
}

const MOBILE_BREAKPOINT = 768

export function useIsMobile(breakpoint = MOBILE_BREAKPOINT) {
	const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

	React.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
		const onChange = () => {
			setIsMobile(window.innerWidth < breakpoint)
		}
		mql.addEventListener('change', onChange)
		setIsMobile(window.innerWidth < breakpoint)
		return () => mql.removeEventListener('change', onChange)
	}, [breakpoint])

	return !!isMobile
}

export function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}
