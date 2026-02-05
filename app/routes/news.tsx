import { BodyText } from '#app/components/cms/body-text.tsx'
import { Heading } from '#app/components/cms/heading.tsx'
import { Section } from '#app/components/cms/section.tsx'
import { Container } from '#app/components/container.tsx'
import { Image } from '#app/components/image.tsx'
import { Badge } from '#app/components/ui/badge.tsx'
import { Button } from '#app/components/ui/button.tsx'
import {
	Card,
	CardContent,
	CardFooter,
	CardTitle,
} from '#app/components/ui/card.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { ItemSeparator } from '#app/components/ui/item.tsx'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from '#app/components/ui/pagination.tsx'
import { company } from '#app/content/common.ts'
import { cn } from '#app/utils/misc.tsx'
import { Link } from 'react-router'
import z from 'zod'
import newsData from '../../public/content/news.json'
import type { Route } from './+types/news'

const baseEventSchema = z.object({
	thumbnail: z
		.object({
			src: z.string(),
			alt: z.string().optional(),
		})
		.optional(),
	title: z.string(),
	description: z.string().optional(),
	actionLabel: z.string().optional(),
	badgeLabel: z.string().optional(),
})

const newsPostSchema = z.discriminatedUnion('type', [
	baseEventSchema.extend({
		type: z.literal('facebook'),
		href: z.string(),
	}),
	baseEventSchema.extend({
		type: z.literal('event'),
		href: z.string(),
	}),
])

type NewsPost = z.infer<typeof newsPostSchema>

const searchParamsSchema = z
	.object({
		page: z.coerce.number().min(1),
	})
	.partial()

const LIMIT = 10

export async function loader({ request }: Route.LoaderArgs) {
	const searchParams = new URL(request.url).searchParams

	const { page = 1 } =
		searchParamsSchema.safeParse(Object.fromEntries(searchParams.entries()))
			.data ?? {}

	const parsed = newsPostSchema.array().safeParse(newsData.posts)
	if (parsed.error)
		throw new Error('Invalid formatted news data', {
			cause: parsed.error,
		})

	const allPosts = parsed.data

	const totalCount = allPosts.length
	const offset = LIMIT * (page - 1)
	const items = parsed.data.slice(offset, offset + LIMIT)

	if (totalCount && !items.length) {
		throw new Response('Not Found', { status: 404 })
	}

	return {
		posts: {
			page,
			limit: LIMIT,
			items: parsed.data.slice(offset, offset + LIMIT),
			total: totalCount,
			offset,
		},
	}
}

const NEWS_POST_BADGE_LABEL = {
	facebook: 'Facebook Post',
	event: 'Event',
} satisfies { [K in NewsPost['type']]?: string }
const DEFAULT_NEWS_POST_BADGE_LABEL = 'Post'

const NEWS_POST_ACTION_LABEL = {
	facebook: 'Read post',
	event: 'See event',
} satisfies { [K in NewsPost['type']]?: string }
const DEFAULT_NEWS_POST_ACTION_LABEL = 'Read more'

const DEFAULT_NEWS_POST_THUMBNAIL_ALT = 'BLAC News'

export default function Component({ loaderData }: Route.ComponentProps) {
	const previousPage = Math.max(1, loaderData.posts.page - 1)
	const maxPage = Math.max(
		1,
		Math.ceil(loaderData.posts.total / loaderData.posts.limit),
	)
	const nextPage = Math.min(maxPage, loaderData.posts.page + 1)

	const startPageIndex = loaderData.posts.offset + 1
	const endPageIndex = Math.min(
		loaderData.posts.offset + loaderData.posts.limit,
		loaderData.posts.total,
	)

	return (
		<>
			<Section>
				<Container>
					<Heading as="h1" size="lg">
						News
					</Heading>
					<BodyText>
						<p>Read news on events, facebook posts, updates, and more.</p>
					</BodyText>
				</Container>
			</Section>

			<Section className="bg-gray-50">
				<Container>
					{loaderData.posts.items.length ? (
						<div className="space-y-12">
							<BodyText muted>
								<p>
									Showing {startPageIndex}-{endPageIndex} of{' '}
									{loaderData.posts.total}.
								</p>
							</BodyText>

							<ul role="list">
								{loaderData.posts.items.map((post, i) => (
									<>
										{i !== 0 && <ItemSeparator className="my-8" />}
										<NewsPost post={post} />
									</>
								))}
							</ul>

							<Pagination>
								<PaginationContent className="w-full justify-between">
									<PaginationItem>
										{loaderData.posts.page !== 1 && (
											<PaginationPrevious
												to={previousPage !== 1 ? `?page=${previousPage}` : ''}
												size="lg"
												variant="outline"
												className="border-secondary text-xl shadow-none"
											/>
										)}
									</PaginationItem>

									<PaginationItem>
										{loaderData.posts.page !== maxPage && (
											<PaginationNext
												to={`?page=${nextPage}`}
												size="lg"
												variant="outline"
												className="border-secondary text-xl shadow-none"
											/>
										)}
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</div>
					) : (
						<BodyText className="w-full p-4">
							<p className="mx-auto">No posts available</p>
						</BodyText>
					)}
				</Container>
			</Section>
		</>
	)
}

function NewsPost({ post }: { post: NewsPost }) {
	return (
		<Card
			role="listitem"
			className="group hover:bg-accent relative flex gap-8 border-none bg-transparent py-2 shadow-none @xl/container:flex-row @xl/container:gap-0"
		>
			<span
				className={cn(
					'bg-secondary/50 absolute top-0 left-0 h-full w-px',
					'transition-all duration-200',
					'group-hover:bg-primary group-hover:w-1',
				)}
			/>

			<div className="flex-1 @xl/container:max-w-64 @xl/container:pr-4 @xl/container:pl-8 @3xl/container:max-w-96">
				{post.thumbnail ? (
					<Image
						role="presentation"
						src={post.thumbnail.src}
						alt={post.thumbnail.alt ?? DEFAULT_NEWS_POST_THUMBNAIL_ALT}
						width={450}
						height={350}
						fit="cover"
						className="size-full object-cover"
					/>
				) : (
					<div className="grid place-content-center bg-white">
						<Icon
							name="logo"
							title={`${company.shortName} Logo`}
							className="m-8 size-full max-w-40"
						/>
					</div>
				)}
			</div>

			<div className="grid flex-1 gap-4">
				<CardContent className="space-y-4">
					<Badge variant="secondary">
						{post.badgeLabel ??
							NEWS_POST_BADGE_LABEL[post.type] ??
							DEFAULT_NEWS_POST_BADGE_LABEL}
					</Badge>
					<CardTitle asChild>
						<h2>{post.title}</h2>
					</CardTitle>
					{post.description && (
						<BodyText muted>
							<p>{post.description}</p>
						</BodyText>
					)}
				</CardContent>

				<CardFooter className="mt-auto">
					<Button variant="link" className="p-0" asChild>
						<Link to={'href' in post ? post.href : '#'}>
							{post.actionLabel ??
								NEWS_POST_ACTION_LABEL[post.type] ??
								DEFAULT_NEWS_POST_ACTION_LABEL}
							<span className="absolute inset-0 size-full" />
							<Icon name="arrow-square-out" />
						</Link>
					</Button>
				</CardFooter>
			</div>
		</Card>
	)
}
