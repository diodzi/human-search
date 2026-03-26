import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get('q')
  if (!query) return new Response(JSON.stringify([]))

  const googleSuggestUrl = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}`

  try {
    const response = await fetch(googleSuggestUrl)
    const data = await response.json()

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/x-suggestions+json',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (e) {
    return new Response(JSON.stringify([query, []]))
  }
}
