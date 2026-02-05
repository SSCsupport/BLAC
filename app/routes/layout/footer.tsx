import { CTAOne } from '#app/components/cms/blocks/cta-1/index.tsx'
import { Section } from '#app/components/cms/section'
import { Container } from '#app/components/container'
import { Icon } from '#app/components/ui/icon.tsx'
import { contactLink, donationLink, socials } from '#app/content/common.ts'
import { href, Link } from 'react-router'
import { Logo } from './logo'

interface MenuItem {
	title: string
	to: string
}

interface Menu {
	title: string
	items: MenuItem[]
}

export const quickLinks: Menu = {
	title: 'Quick Links',
	items: [
		{
			title: 'Home',
			to: href('/'),
		},
		{
			title: 'About',
			to: href('/about'),
		},
		{
			title: 'News',
			to: href('/news'),
		},
		{
			title: 'Contact us',
			to: contactLink,
		},
		{
			title: 'Become a Member',
			to: `${href('/')}#memberships`,
		},
		{
			title: 'Donate',
			to: donationLink,
		},
	],
}

export function Footer() {
	return (
		<>
			<Section color="dark" className="bg-secondary text-secondary-foreground">
				<CTAOne
					title="Support Our Work"
					body={
						<p>
							Your gift powers mentorship, scholarships, and advocacy for
							attorneys of color across Greater Cincinnati.
						</p>
					}
					action={{
						label: 'Donate',
						to: donationLink,
					}}
				/>
			</Section>
			<Section as="footer" color="dark" className="mt-auto">
				<Container>
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-4">
						<div className="-mt-3 lg:col-span-2">
							<Logo size="lg" />
						</div>

						<div key={quickLinks.title}>
							<h3 className="mb-4 font-bold">{quickLinks.title}</h3>
							<ul className="text-muted-foreground space-y-4">
								{quickLinks.items.map((item) => (
									<li key={item.to}>
										<Link
											to={item.to}
											className="hover:text-primary-foreground font-medium underline-offset-4"
										>
											{item.title}
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div>
							<p className="mb-3 font-bold">Follow us</p>
							<ul className="flex items-center gap-2">
								{Object.values(socials).map((social) => (
									<li key={social.to}>
										<Link
											to={social.to}
											className="bg-muted text-muted-foreground hover:text-primary-foreground flex size-12 items-center justify-center rounded-full transition-colors"
										>
											<Icon name={social.iconName} className="size-6" />
											<span className="sr-only">{social.title}</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</Container>
			</Section>
		</>
	)
}
