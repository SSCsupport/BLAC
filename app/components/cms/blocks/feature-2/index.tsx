import { Container } from '#app/components/container.tsx'
import { Badge } from '#app/components/ui/badge.tsx'
import { Button } from '#app/components/ui/button.tsx'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '#app/components/ui/card.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { company, membership } from '#app/content/common.ts'
import { cn } from '#app/utils/misc.tsx'
import { Link } from 'react-router'
import { BodyText } from '../../body-text'
import { Heading } from '../../heading'

export function FeatureTwo({
	title,
	body,
	className,
}: {
	title: string
	body: React.ReactNode

	className?: string
}) {
	return (
		<Container className={cn(className, 'space-y-16')}>
			<div>
				<Heading as="h2">{title}</Heading>
				<BodyText>{body}</BodyText>
			</div>
			<div className="grid max-w-screen-xl grid-cols-1 gap-4 @3xl/container:grid-cols-2 @3xl/container:gap-8">
				<MembershipItem item={membership.annual} primary />
				<MembershipItem item={membership.lifetime} />
				<MembershipItem item={membership.attorneyAnnual} />
				<MembershipItem item={membership.associateAnnual} />
			</div>
			<BodyText muted>
				<ul>
					<li>
						Questions or need a dues waiver?{' '}
						<Link
							to={`mailto:${company.contactEmail}`}
							className="text-primary"
						>
							Contact us
						</Link>
					</li>
					<li>
						Firm paying for multiple members?{' '}
						<Link
							to={`mailto:${company.contactEmail}`}
							className="text-primary"
						>
							Request an invoice
						</Link>
					</li>
					<li>
						Payments are processed securely by{' '}
						<Link to="#" className="text-primary overflow-hidden">
							<span className="sr-only">Stripe</span>
							<Icon name="stripe" className="-ml-1.5 h-10 w-20" />
						</Link>
					</li>
				</ul>
			</BodyText>
		</Container>
	)
}

const formatPrice = (price: number) => {
	return price.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
	})
}

function MembershipItem({
	item,
	primary,
}: {
	item: (typeof membership)[keyof typeof membership]
	primary?: boolean
}) {
	return (
		<Card
			className={cn({
				'border-primary': primary,
				'border-secondary': !primary,
			})}
		>
			<CardHeader>
				<CardTitle className="flex justify-between gap-4 max-md:flex-col-reverse md:items-center">
					{item.label}{' '}
					{primary && (
						<Badge
							variant="outline"
							size="lg"
							className="border-primary text-primary font-sans"
						>
							Most Popular
						</Badge>
					)}
				</CardTitle>
			</CardHeader>
			<CardContent className="max-w-prose space-y-4 text-pretty">
				<p>
					<span className="text-2xl font-medium md:text-3xl">
						{formatPrice(item.price)}
					</span>
					<span className="text-muted-foreground ml-auto text-sm md:text-base">
						{' '}
						{item.timeframe === 'annual' ? (
							'per year'
						) : item.timeframe === 'one-time' ? (
							'once'
						) : (
							<span className="italic">{item.timeframe}</span>
						)}
					</span>
				</p>
				<p className="text-muted-foreground text-lg">{item.description}</p>
			</CardContent>
			<CardFooter className="mt-auto">
				<Button
					className="w-full"
					size="lg"
					variant={primary ? 'default' : 'secondary'}
					asChild
				>
					<Link to={item.href}>
						Join {item.timeframe === 'annual' ? '' : 'for life'} {'–'}{' '}
						{formatPrice(item.price)}
					</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}
