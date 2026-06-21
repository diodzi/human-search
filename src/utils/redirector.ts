import { getSettings } from './settings'

type BangMap = Record<string, string>

const SYSTEM_BANGS: BangMap = {
  '?': 'https://www.google.com/search?q=reddit%20',
  '?g': 'https://www.genius.com/search?q=',
  '!google': 'https://www.google.com/search?q=',
}

const FALLBACK_URLS = {
  google: 'https://www.google.com/search?q=',
  duckduckgo: 'https://www.duckduckgo.com/?q=',
}

export function resolveBang(inputUrl: string): string | null {
  let settings
  try {
    settings = getSettings() || { fallback: 'google', customBangs: {} }
  } catch (e) {
    settings = { fallback: 'google', customBangs: {} }
  }
  const ALL_BANGS = { ...SYSTEM_BANGS, ...settings.customBangs }

  const url = new URL(inputUrl)
  const rawQuery = url.searchParams.get('q') || url.searchParams.get('search')

  if (!rawQuery) return null

  let query = rawQuery.trim()
  query = query.replace(/\+/g, ' ')
  const keys = Object.keys(ALL_BANGS)

  const sortedKeys = keys.sort((a, b) => b.length - a.length)
  const escapedKeys = sortedKeys.map((k) =>
    k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
  )

  const pattern = new RegExp(
    `(^(${escapedKeys.join('|')})\\s+)|(\\s*(${escapedKeys.join('|')})$)`,
    'i',
  )

  query = query.replace(/\s+/g, ' ').trim()
  const match = query.match(pattern)

  if (match) {
    const trigger = (match[2] || match[4]).toLowerCase()
    const baseUrl = ALL_BANGS[trigger]

    const searchTerm = query
      .replace(
        new RegExp(trigger.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
        '',
      )
      .trim()

    if (!searchTerm) return new URL(baseUrl).origin

    return baseUrl + encodeURIComponent(searchTerm)
  }

  const fallbackBase =
    FALLBACK_URLS[settings.fallback as keyof typeof FALLBACK_URLS] ||
    FALLBACK_URLS.google

  return fallbackBase + encodeURIComponent(query)
}
