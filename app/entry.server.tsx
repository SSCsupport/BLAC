import crypto from 'node:crypto'
import { PassThrough } from 'node:stream'
import { createReadableStreamFromReadable } from '@react-router/node'
import { isbot } from 'isbot'
import { renderToPipeableStream } from 'react-dom/server'
import {
	ServerRouter,
	type HandleDocumentRequestFunction,
} from 'react-router'
import { getEnv, init } from './utils/env.server'

export const streamTimeout = 5000

init()
global.ENV = getEnv()

type DocRequestArgs = Parameters<HandleDocumentRequestFunction>

export default async function handleRequest(...args: DocRequestArgs) {
	const [request, responseStatusCode, responseHeaders, reactRouterContext] =
		args

	const callbackName = isbot(request.headers.get('user-agent'))
		? 'onAllReady'
		: 'onShellReady'

	const nonce = crypto.randomBytes(16).toString('hex')
	return new Promise(async (resolve, reject) => {
		let didError = false

		const { pipe, abort } = renderToPipeableStream(
				<ServerRouter
					context={reactRouterContext}
					url={request.url}
				/>,
			{
				[callbackName]: () => {
					const body = new PassThrough()
					responseHeaders.set('Content-Type', 'text/html')

					resolve(
						new Response(createReadableStreamFromReadable(body), {
							headers: responseHeaders,
							status: didError ? 500 : responseStatusCode,
						}),
					)
					pipe(body)
				},
				onShellError: (err: unknown) => {
					reject(err)
				},
				onError: () => {
					didError = true
				},
				nonce,
			},
		)

		setTimeout(abort, streamTimeout + 5000)
	})
}
