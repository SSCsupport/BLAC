import { promises as fs } from 'node:fs'
import path from 'node:path'
import { getImgPlaceholder as getImgPlaceholderBase } from 'openimg/node'

let cacheMap = new Map<string, string>()

export async function getImgPlaceholder(src: string) {
	let placeholder = cacheMap.get(src)
	if (!placeholder) {
		const filePath = path.join(
			process.cwd(),
			`/public/${src.replace(/^\//, '')}`,
		)
		placeholder = await getImgPlaceholderBase(await fs.readFile(filePath))
		cacheMap.set(src, placeholder)
	}
	return placeholder
}

export async function getImgPlaceholders<T extends string>(
	srcs: Record<T, string>,
): Promise<Record<T, string>> {
	const placeholders = (
		await Promise.all(
			(Object.keys(srcs) as T[]).map(async (key) => {
				const placeholder = await getImgPlaceholder(srcs[key])
				return { [key]: placeholder }
			}),
		)
	).reduce((acc, curr) => ({ ...acc, ...curr }), {}) as Record<T, string>
	return placeholders
}
