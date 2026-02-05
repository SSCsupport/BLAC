import { getErrorMessage } from '#app/utils/misc'
import { type ReactElement } from 'react'
import {
	isRouteErrorResponse,
	useParams,
	useRouteError,
	type ErrorResponse,
} from 'react-router'
import { BodyText } from './cms/body-text'
import { Container } from './container'

type StatusHandler = (info: {
	error: ErrorResponse
	params: Record<string, string | undefined>
}) => ReactElement | null

export function GeneralErrorBoundary({
	defaultStatusHandler = ({ error }) => (
		<BodyText>
			{error.status} {error.data}
		</BodyText>
	),
	statusHandlers,
	unexpectedErrorHandler = (error) => <p>{getErrorMessage(error)}</p>,
}: {
	defaultStatusHandler?: StatusHandler
	statusHandlers?: Record<number, StatusHandler>
	unexpectedErrorHandler?: (error: unknown) => ReactElement | null
}) {
	const error = useRouteError()
	const params = useParams()
	const isResponse = isRouteErrorResponse(error)

	if (typeof document !== 'undefined') {
		console.error(error)
	}

	return (
		<Container className="text-h2 grid items-center p-20">
			{isResponse
				? (statusHandlers?.[error.status] ?? defaultStatusHandler)({
						error,
						params,
					})
				: unexpectedErrorHandler(error)}
		</Container>
	)
}
