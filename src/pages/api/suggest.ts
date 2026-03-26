export const prerender = false

import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get('q') || ''

  const fallback = [query, []]

  if (!query.trim()) {
    return new Response(JSON.stringify(fallback), {
      headers: { 'Content-Type': 'application/x-suggestions+json' },
    })
  }

  const googleSuggestUrl = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}`

  try {
    const response = await fetch(googleSuggestUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    })

    const data = await response.json()

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/x-suggestions+json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (e) {
    return new Response(JSON.stringify(fallback), {
      headers: { 'Content-Type': 'application/x-suggestions+json' },
    })
  }
}
