import type { RequestHandler } from './$types';
import { API_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	const fd = await request.formData();
	const file = fd.get('file');

	if (!(file instanceof File) || file.size === 0) {
		return new Response('No file provided', { status: 400 });
	}

	const upstream = new FormData();
	upstream.append('file', file, file.name);

	const alt = fd.get('alt');
	const caption = fd.get('caption');
	const isPublic = fd.get('isPublic');

	if (alt) upstream.append('alt', alt as string);
	if (caption) upstream.append('caption', caption as string);
	upstream.append('isPublic', isPublic === 'on' ? 'true' : 'false');

	const res = await fetch(`${API_URL}/assets/upload`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${locals.accessToken?.tokenValue}` },
		body: upstream
	});

	if (!res.ok) {
		const text = await res.text();
		return new Response(`Upload failed: ${text}`, { status: res.status });
	}

	redirect(303, '/assets');
};
