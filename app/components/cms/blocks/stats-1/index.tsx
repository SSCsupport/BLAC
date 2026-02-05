import { AnimatedNumber } from '#app/components/animated-number.tsx'
import { Container } from '#app/components/container.tsx'
import { BodyText } from '../../body-text'
import { Heading } from '../../heading'

const formatUnit = (value: number) =>
	new Intl.NumberFormat('en-US', {
		minimumIntegerDigits: 3,
		maximumFractionDigits: 0,
	}).format(value)

const formatCurrency = (value: number) =>
	new Intl.NumberFormat('en-US', {
		minimumIntegerDigits: 3,
		maximumFractionDigits: 0,
		style: 'currency',
		currency: 'USD',
	}).format(value)

const floor = (value: number, precision: number) =>
	Math.floor(value / Math.pow(10, precision)) * Math.pow(10, precision)

const stats: {
	value: number
	format: (value: number) => string
	title: string
	description: string
}[] = [
	{
		value: 1124,
		format: (value) => `${formatUnit(floor(value, 1))}+`,
		title: 'Attorneys and law students engaged.',
		description: 'Through mentorship, CLEs, and professional development.',
	},
	{
		value: 101_333,
		format: (value) => `${formatCurrency(floor(value, 2) / 1000)}K+`,
		title: 'Scholarships and grants awarded.',
		description:
			'Supporting education, bar prep, and leadership opportunities.',
	},
	{
		value: 2222,
		format: (value) => `${formatUnit(floor(value, 1))}+`,
		title: 'Community and pro bono hours.',
		description: 'Delivered with partners across Greater Cincinnati.',
	},
]

export function StatsOne({
	title,
	body,
	className,
}: {
	title: string
	body: React.ReactNode
	className?: string
}) {
	return (
		<Container className={className}>
			<div className="grid gap-16">
				<div>
					<Heading as="h2">{title}</Heading>
					<BodyText>{body}</BodyText>
				</div>
				<div className="grid max-w-screen-xl grid-cols-1 gap-16 lg:grid-cols-3">
					{stats.map((stat) => (
						<div
							key={stat.title}
							className="border-secondary-foreground flex-1 border-t"
						>
							<Heading as="h3" className="mt-12 mb-8">
								<AnimatedNumber value={stat.value} format={stat.format} />
							</Heading>
							<BodyText>
								<p>
									<span className="block font-medium text-gray-100 sm:font-normal">
										{stat.title}
									</span>
									<span className="mt-2 block text-sm sm:text-base">
										{stat.description}
									</span>
								</p>
							</BodyText>
						</div>
					))}
				</div>
			</div>
		</Container>
	)
}
