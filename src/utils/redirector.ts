type BangMap = Record<string, string>

const BANGS: BangMap = {
  '?': 'https://www.google.com/search?q=reddit%20',
  '!g': 'https://www.genius.com/search?q=',
  '!google': 'https://www.google.com/search?q=',
}

export function resolveBang(inputUrl: string): string | null {
  const url = new URL(inputUrl)
  const rawQuery = url.searchParams.get('q') || url.searchParams.get('search')

  if (!rawQuery) return null

  let query = rawQuery.trim()
  const keys = Object.keys(BANGS)

  const sortedKeys = keys.sort((a, b) => b.length - a.length)
  const escapedKeys = sortedKeys.map((k) =>
    k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
  )

  const pattern = new RegExp(
    `(^(${escapedKeys.join('|')})\\s+)|(\\s*(${escapedKeys.join('|')})$)`,
    'i',
  )

  const match = query.match(pattern)

  if (match) {
    const trigger = (match[2] || match[4]).toLowerCase()
    const baseUrl = BANGS[trigger]

    const searchTerm = query.replace(trigger, '').trim()

    if (!searchTerm) return new URL(baseUrl).origin

    return baseUrl + encodeURIComponent(searchTerm)
  }

  return BANGS['!google'] + encodeURIComponent(query)
}
