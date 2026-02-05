import React from 'react'
import { NavLink } from 'react-router'
import { Breadcrumb } from '../utils/breadcrumbs'
import {
	Breadcrumb as BaseBreadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from './ui/breadcrumb'

export interface BreadcrumbsProps {
	items: Breadcrumb[]
	className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
	return (
		<BaseBreadcrumb>
			<BreadcrumbList>
				{items.map((item, index, arr) => (
					<React.Fragment key={item.to}>
						<BreadcrumbItem className="max-w-20 truncate md:max-w-none">
							{index === arr.length - 1 ? (
								<BreadcrumbPage>{item.label}</BreadcrumbPage>
							) : (
								<NavLink to={item.to} prefetch="intent">
									{item.label}
								</NavLink>
							)}
						</BreadcrumbItem>
						{index !== arr.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</BaseBreadcrumb>
	)
}
