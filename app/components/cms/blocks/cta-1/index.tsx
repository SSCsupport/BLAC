import { Container } from '#app/components/container.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Link } from 'react-router'
import { BodyText } from '../../body-text'
import { Heading } from '../../heading'

export function CTAOne({
	title,
	body,
	action,
	className,
}: {
	title: string
	body: React.ReactNode
	action:
		| {
				label: string
				to: string
				onClick?: () => void
		  }
		| {
				label: string
				onClick: () => void
		  }
	className?: string
}) {
	return (
		<Container className={className}>
			<div className="flex flex-col justify-center gap-8 sm:flex-row sm:items-center">
				<div className="flex-1">
					<Heading as="h2">{title}</Heading>
					<BodyText>{body}</BodyText>
				</div>
				<div>
					<Button
						size="lg"
						variant="default"
						className="w-full text-xl sm:w-fit"
						asChild
					>
						{'to' in action ? (
							<Link to={action.to} onClick={action.onClick}>
								{action.label}
							</Link>
						) : (
							<button onClick={action.onClick}>{action.label}</button>
						)}
					</Button>
				</div>
			</div>
		</Container>
	)
}
