import { isbot } from 'isbot'
import { renderToReadableStream } from 'react-dom/server' /* O react-dom/server.bun dependiendo de tu runtime */
import type { AppLoadContext, EntryContext } from 'react-router'
import { ServerRouter } from 'react-router'

const MODE = process.env.NODE_ENV ?? 'development'

export default async function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	routerContext: EntryContext,
	loadContext: AppLoadContext
) {
	const userAgent = request.headers.get('user-agent')
	const isBot = isbot(userAgent || '')

	// Opcional de Epic Stack: Puedes inyectar Profiling en producción para depurar rendimiento
	if (MODE === 'production') {
		responseHeaders.append('Document-Policy', 'js-profiling')
	}

	let didError = false

	const stream = await renderToReadableStream(
		<ServerRouter context={routerContext} url={request.url} />,
		{
			signal: request.signal,
			onError(error: unknown) {
				// Log streaming rendering errors from inside the shell
				console.error(error)
				didError = true
			},
		}
	)

	// Para bots (SEO) o modo SPA, espera a que todo el contenido esté listo antes de enviar
	if (isBot) {
		await stream.allReady
	} else {
		// Para usuarios reales, empezamos a mandar fragmentos del HTML de inmediato (Streaming)
		// Esto hace que la página cargue muchísimo más rápido
		responseHeaders.set('Transfer-Encoding', 'chunked')
	}

	responseHeaders.set('Content-Type', 'text/html; charset=utf-8')

	return new Response(stream, {
		headers: responseHeaders,
		status: didError ? 500 : responseStatusCode,
	})
}
