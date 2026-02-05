import { Image } from '#app/components/image.tsx'
import { Button } from '#app/components/ui/button.tsx'
import type { leadershipTeam } from '#app/content/leadership.tsx'
import { cn } from '#app/utils/misc.tsx'
import { href, Link } from 'react-router'

export function LeadershipCard({
	person,
	placeholder,
	className,
}: {
	person: (typeof leadershipTeam)[number]
	placeholder?: string
	className?: string
}) {
	return (
		<div className={cn('relative flex w-fit flex-col-reverse', className)}>
			<div className="@container space-y-2 pt-4">
				<p className="border-primary border-l-4 pl-2 text-xs/none uppercase">
					{person.role}
				</p>
				<h3 className="font-serif text-xl/normal font-bold text-balance @sm:text-3xl/normal">
					{person.name}
				</h3>
			</div>
			<Image
				src={person.image.src}
				alt={person.image.alt}
				width={450}
				height={450}
				params={person.image.params}
				fit="cover"
				placeholder={placeholder}
				className="border-secondary border object-contain"
			/>
			<div className="z-10 -mr-2 -mb-10 flex justify-end">
				<Button variant="outline" className="border-secondary" asChild>
					<Link
						to={href('/about/leadership/:slug', {
							slug: person.slug,
						})}
					>
						About me
						<span className="absolute inset-0 size-full" />
					</Link>
				</Button>
			</div>
		</div>
	)
}
