import type { RequestHandler } from './$types';
import { API_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ params, locals }) => {
	const upstream = await fetch(`${API_URL}/assets/${params.slug}`, {
		headers: locals.accessToken?.tokenValue
			? { Authorization: `Bearer ${locals.accessToken.tokenValue}` }
			: {}
	});

	if (!upstream.ok) {
		return new Response('Not found', { status: upstream.status });
	}

	return new Response(upstream.body, {
		headers: {
			'Content-Type': upstream.headers.get('Content-Type') ?? 'application/octet-stream',
			'Cache-Control': 'private, max-age=3600'
		}
	});
};
