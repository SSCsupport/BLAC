'use client'

import { Container } from '#app/components/container'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '#app/components/ui/accordion'
import { Button } from '#app/components/ui/button'
import { Icon } from '#app/components/ui/icon'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '#app/components/ui/navigation-menu'
import { contactLink, donationLink } from '#app/content/common.ts'
import { cn } from '#app/utils/misc'
import { useState } from 'react'
import { href, Link, NavLink } from 'react-router'
import { Logo } from './logo'

interface MenuItem {
	to: string
	title: string
	description?: string
}

type Menu = {
	title: string
} & (
	| {
			items: MenuItem[]
	  }
	| {
			to: string
	  }
)

const menu: Menu[] = [
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
		title: 'Join Newsletter',
		to: 'https://cincyblac.us4.list-manage.com/subscribe?u=25b60bf7591a2072eed249df0&id=ba5aa3e5df',
	},
	{
		title: 'Contact us',
		to: contactLink,
	},
	
]

const buttons = {
	primary: {
		label: 'Donate',
		to: donationLink,
	},
	secondary: {
		label: 'Become a Member',
		to: `${href('/')}#memberships`,
	},
}

export function Header() {
	return (
		<header className="bg-background relative z-50 w-full border-b">
			<Navbar />
		</header>
	)
}

const Navbar = ({ className }: { className?: string }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className={cn('relative', className)}>
			<Container className="h-[var(--header-height)]">
				<nav className="relative z-10 flex h-full items-center justify-between gap-6 py-2 lg:py-4">
					<Logo size="auto" hideTextOnMobile onClick={() => setIsOpen(false)} />

					<div className="flex items-center gap-4 lg:gap-8">
						<div className="hidden items-center lg:flex">
							<NavigationMenu viewport={false}>
								<NavigationMenuList>
									{menu.map((item) => (
										<NavbarMenuItem
											key={item.title}
											item={item}
											onClose={() => setIsOpen(false)}
										/>
									))}
								</NavigationMenuList>
							</NavigationMenu>
						</div>

						<div
							className={cn(
								'flex items-center gap-4 transition-opacity duration-300 ease-in-out',
								{ 'opacity-0': isOpen },
							)}
						>
							<Button
								variant="secondary"
								size="lg"
								className="hidden lg:flex"
								asChild
							>
								<Link
									to={buttons.secondary.to}
									onClick={() => setIsOpen(false)}
								>
									{buttons.secondary.label}
								</Link>
							</Button>

							<Button variant="default" size="lg" asChild>
								<Link to={buttons.primary.to} onClick={() => setIsOpen(false)}>
									{buttons.primary.label}
								</Link>
							</Button>
						</div>

						<Button
							variant="secondary"
							size="icon"
							onClick={() => setIsOpen((v) => !v)}
							className="size-12 lg:hidden"
						>
							<Icon name={!isOpen ? 'list' : 'x'} className="size-6" />
							<span className="sr-only">Menu</span>
						</Button>
					</div>
				</nav>
			</Container>

			<div
				className={cn(
					'bg-background absolute top-full flex min-h-[calc(100vh-var(--header-height))] w-full flex-col border-b pb-8 transition-all duration-300 ease-in-out lg:hidden',
					{
						'invisible translate-x-full opacity-0': !isOpen,
						'visible translate-x-0 opacity-100': isOpen,
					},
				)}
			>
				<Container>
					<div className="mt-8 space-y-2">
						<Button variant="default" className="w-full" asChild>
							<Link to={buttons.primary.to} onClick={() => setIsOpen(false)}>
								{buttons.primary.label}
							</Link>
						</Button>
						<Button variant="secondary" className="w-full" asChild>
							<Link to={buttons.secondary.to} onClick={() => setIsOpen(false)}>
								{buttons.secondary.label}
							</Link>
						</Button>
					</div>
					<nav className="mt-3 flex flex-1 flex-col gap-6">
						<Accordion
							type="single"
							collapsible
							className="mt-3 flex flex-1 flex-col gap-6"
						>
							{menu.map((item) => (
								<NavbarMobileMenuItem
									key={item.title}
									item={item}
									onClose={() => setIsOpen(false)}
								/>
							))}
						</Accordion>
					</nav>
				</Container>
			</div>
		</div>
	)
}

function NavbarMenuItem({
	item,
	onClose,
}: {
	item: Menu
	onClose: () => void
}) {
	if ('items' in item) {
		return (
			<NavigationMenuItem>
				<NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
				<NavigationMenuContent className="bg-popover text-popover-foreground">
					<ul className="grid w-3xl grid-cols-[.85fr_1fr_1fr] grid-rows-3 gap-4 p-4">
						{item.items.map((subItem) => (
							<li key={subItem.title} className="row-span-1">
								<NavigationMenuLink asChild>
									<NavbarSubMenuLink item={subItem} onClick={onClose} />
								</NavigationMenuLink>
							</li>
						))}
					</ul>
				</NavigationMenuContent>
			</NavigationMenuItem>
		)
	}

	return (
		<NavigationMenuItem>
			<NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
				<NavLink
					to={item.to}
					onClick={onClose}
					className="underline-offset-4 aria-[current=page]:underline"
				>
					{item.title}
				</NavLink>
			</NavigationMenuLink>
		</NavigationMenuItem>
	)
}

function NavbarMobileMenuItem({
	item,
	onClose,
}: {
	item: Menu
	onClose: () => void
}) {
	if ('items' in item) {
		return (
			<AccordionItem key={item.title} value={item.title} className="border-b-0">
				<AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
					{item.title}
				</AccordionTrigger>
				<AccordionContent className="mt-2">
					{item.items.map((subItem) => (
						<NavbarSubMenuLink
							key={subItem.title}
							item={subItem}
							onClick={onClose}
						/>
					))}
				</AccordionContent>
			</AccordionItem>
		)
	}

	return (
		<Link
			key={item.title}
			to={item.to}
			onClick={onClose}
			className="text-lg font-semibold"
		>
			{item.title}
		</Link>
	)
}

function NavbarSubMenuLink({
	item,
	className,
	onClick,
}: {
	item: MenuItem
	className?: string
	onClick: () => void
}) {
	return (
		<Link
			className={cn(
				'hover:bg-muted hover:text-accent-foreground flex flex-row gap-4 rounded-md p-2 leading-none no-underline transition-colors outline-none select-none',
				className,
			)}
			to={item.to}
			onClick={onClick}
		>
			<div>
				<div className="text-sm leading-none font-medium">{item.title}</div>
				<p className="text-muted-foreground mt-1 line-clamp-2 text-sm leading-snug">
					{item.description}
				</p>
			</div>
		</Link>
	)
}

export { Navbar }
