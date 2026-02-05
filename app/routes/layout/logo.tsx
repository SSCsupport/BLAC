import { Icon } from '#app/components/ui/icon.tsx'
import { company } from '#app/content/common.ts'
import { cn } from '#app/utils/misc'
import { href, type LinkProps } from 'react-router'

import { Link } from 'react-router'

export function Logo({
	size = 'md',
	className,
	hideTextOnMobile = false,
	...props
}: Omit<LinkProps, 'to'> & {
	size?: 'lg' | 'md' | 'auto'
	hideTextOnMobile?: boolean
}) {
	const parts = company.fullName.split(' ')
	const firstPart = [parts[0], parts[1], parts[2]].join(' ')
	const secondPart = [parts[3], parts[4]].join(' ')

	return (
		<Link
			to={href('/')}
			className={cn(
				'flex items-center gap-4 rounded-md whitespace-nowrap text-gray-800 dark:text-gray-200',
				{
					'h-16': size === 'md',
					'h-24': size === 'lg',
					'h-full': size === 'auto',
				},
				{
					'text-base/tight lg:text-lg/tight xl:text-xl/tight':
						size === 'md' || size === 'auto',
					'text-lg/tight lg:text-xl/tight xl:gap-6 xl:text-2xl/tight':
						size === 'lg',
				},
				className,
			)}
			{...props}
		>
			<Icon
				name="logo"
				title={`${company.shortName} Logo`}
				className="aspect-square h-full w-auto min-w-0 shrink-0 text-gray-700 dark:text-gray-300"
			/>
			<span
				className={cn({
					'max-sm:sr-only': hideTextOnMobile,
				})}
			>
				<span className="font-bold">{firstPart} </span>
				<br />
				<span>{secondPart}</span>
			</span>
		</Link>
	)
}
