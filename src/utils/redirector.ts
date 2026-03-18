type BangMap = Record<string, string>

const BANGS: BangMap = {
  '?': 'https://www.google.com/search?q=reddit%20',
  '!g': 'https://www.google.com/search?q=',
}

export function resolveBang(inputUrl: string): string | null {
  const url = new URL(inputUrl)
  const rawQuery = url.searchParams.get('q') || url.searchParams.get('search')

  if (!rawQuery) return null

  let query = rawQuery.trim()

  const keys = Object.keys(BANGS)

  const words = keys
    .filter((k) => /^[!a-zA-Z0-9]+$/.test(k))
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))

  const symbols = keys
    .filter((k) => !/^[!a-zA-Z0-9]+$/.test(k))
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))

  const pattern = new RegExp(
    `(?:^|\\s)(${words.join('|')})(?:\\s|$)|(${symbols.join('|')})$`,
    'i',
  )

  const match = query.match(pattern)

  if (match) {
    const trigger = (match[1] || match[2]).toLowerCase()
    const baseUrl = BANGS[trigger]

    const searchTerm = query.replace(trigger, '').trim()

    if (!searchTerm) return new URL(baseUrl).origin

    return baseUrl + encodeURIComponent(searchTerm)
  }

  return BANGS['!g'] + encodeURIComponent(query)
}
