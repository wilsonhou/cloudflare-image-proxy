export interface Env {
	PROVIDER_URL: string;
}

async function serveAsset(request: Request, env: Env, ctx: ExecutionContext) {
	const url = new URL(request.url);
	const cache = caches.default;
	let response = await cache.match(request);
	if (!response) {
		const providerURL = `https://${env.PROVIDER_URL}${url.pathname}`;
		response = (await fetch(providerURL, { headers: request.headers })) as unknown as Response; // ignore differences between response shapes
		const headers = new Headers(response.headers);
		headers.set('cache-control', 'public, max-age=14400');
		headers.set('vary', 'Accept');
		response = new Response(response.body, {
			...response,
			headers,
		});
		ctx.waitUntil(cache.put(request, response.clone()));
		return response;
	}
	return response;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if (request.method === 'GET') {
			let response = await serveAsset(request, env, ctx);
			if (!response || response.status > 399) {
				return new Response(response?.statusText, {
					status: response?.status,
				});
			}
			return response;
		} else {
			return new Response('Method not allowed', { status: 405 });
		}
	},
};
