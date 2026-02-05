import {
	cachified as baseCachified,
	totalTtl,
	verboseReporter,
	type Cache,
	type CacheEntry,
	type CachifiedOptions,
	type CreateReporter,
} from '@epic-web/cachified'
import { LRUCache } from 'lru-cache'

const lruInstance = new LRUCache<string, CacheEntry>({ max: 1000 })

export const lru: Cache = {
	set(key, value) {
		const ttl = totalTtl(value?.metadata)
		return lruInstance.set(key, value, {
			ttl: ttl === Infinity ? undefined : ttl,
			start: value?.metadata?.createdTime,
		})
	},
	get(key) {
		return lruInstance.get(key)
	},
	delete(key) {
		return lruInstance.delete(key)
	},
}

export async function cachified<Value>(
	options: Omit<CachifiedOptions<Value>, 'cache'>,
	reporter: CreateReporter<Value> = verboseReporter<Value>(),
): Promise<Value> {
	return baseCachified(
		{
			cache: lru,

			// Time To Live (ttl) in milliseconds: the cached value is considered valid for 1 hour
			ttl: 1000 * 60 * 60,

			// Stale While Revalidate (swr) in milliseconds: if the cached value is less than 30 days
			// expired, return it while fetching a fresh value in the background
			staleWhileRevalidate: 1000 * 60 * 60 * 24 * 30,
			...options,
		},
		reporter, // mergeReporters(cachifiedTimingReporter(timings), reporter),
	)
}
