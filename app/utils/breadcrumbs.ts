import { useMatches, type UIMatch } from 'react-router'

export type Breadcrumb = {
	to: string
	label: string
}

export const makeBreadcrumbHandle = <Loader extends (...args: any) => any>(
	resolverOrBreadcrumb:
		| Breadcrumb
		| Breadcrumb[]
		| ((
				match: UIMatch<Awaited<ReturnType<Loader>>>,
		  ) => Breadcrumb | Breadcrumb[] | undefined),
) => ({
	breadcrumb: (match: UIMatch<Awaited<ReturnType<Loader>>>) =>
		typeof resolverOrBreadcrumb === 'function'
			? resolverOrBreadcrumb(match)
			: resolverOrBreadcrumb,
})

export const useHandleBreadcrumbs = () => {
	const matches = useMatches() as UIMatch<
		unknown,
		Partial<ReturnType<typeof makeBreadcrumbHandle>>
	>[]

	const breadcrumbs = matches
		.filter((match) => match.handle && 'breadcrumb' in match.handle)
		.flatMap(
			(match): Breadcrumb | Breadcrumb[] =>
				match.handle.breadcrumb?.(match as any) ?? [],
		)

	return breadcrumbs
}
