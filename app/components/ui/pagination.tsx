import * as React from 'react'

import { Button, buttonVariants } from '#app/components/ui/button'
import { cn } from '#app/utils/misc'
import { Link } from 'react-router'
import { Icon } from './icon'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
	return (
		<nav
			role="navigation"
			aria-label="pagination"
			data-slot="pagination"
			className={cn('mx-auto flex w-full justify-center', className)}
			{...props}
		/>
	)
}

function PaginationContent({
	className,
	...props
}: React.ComponentProps<'ul'>) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn('flex flex-row items-center gap-1', className)}
			{...props}
		/>
	)
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
	return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
	isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size' | 'variant'> &
	React.ComponentProps<typeof Link>

function PaginationLink({
	className,
	isActive,
	size = 'icon',
	variant,
	...props
}: PaginationLinkProps) {
	return (
		<Link
			aria-current={isActive ? 'page' : undefined}
			data-slot="pagination-link"
			data-active={isActive}
			className={cn(
				buttonVariants({
					variant: variant || isActive ? 'outline' : 'ghost',
					size,
				}),
				className,
			)}
			{...props}
		/>
	)
}

function PaginationPrevious({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to previous page"
			size="default"
			className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
			{...props}
		>
			<Icon name="caret-down" className="-ml-2 rotate-90" />
			<span className="hidden sm:block">Previous</span>
		</PaginationLink>
	)
}

function PaginationNext({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to next page"
			size="default"
			className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
			{...props}
		>
			<span className="hidden sm:block">Next</span>
			<Icon name="caret-down" className="-mr-2 -rotate-90" />
		</PaginationLink>
	)
}

function PaginationEllipsis({
	className,
	...props
}: React.ComponentProps<'span'>) {
	return (
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			className={cn('flex size-9 items-center justify-center', className)}
			{...props}
		>
			<Icon name="dots-three" />
			<span className="sr-only">More pages</span>
		</span>
	)
}

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
}
