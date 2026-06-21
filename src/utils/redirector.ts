import { getSettings, type UserSettings } from './settings'

export type BangMap = Record<string, string>

export const SYSTEM_BANGS: BangMap = {
  '?g': 'https://www.genius.com/search?q=',
  '?w': 'https://en.wikipedia.org/w/index.php?title=Special:Search&search=',
}

export const FALLBACK_URLS = {
  google: 'https://www.google.com/search?q=',
  duckduckgo: 'https://www.duckduckgo.com/?q=',
}

let _swOverrides: Partial<UserSettings> | null = null

export function setSWOverrides(overrides: Partial<UserSettings>) {
  _swOverrides = overrides
}

function loadSettings() {
  try {
    const settings = getSettings() || { fallback: 'google', customBangs: {} }
    if (_swOverrides) {
      if (_swOverrides.fallback !== undefined)
        settings.fallback = _swOverrides.fallback
      if (_swOverrides.customBangs !== undefined)
        settings.customBangs = _swOverrides.customBangs
    }
    return settings
  } catch (e) {
    return {
      fallback: _swOverrides?.fallback || 'google',
      customBangs: _swOverrides?.customBangs || {},
    }
  }
}

export function resolveBang(inputUrl: string): string | null {
  const settings = loadSettings()
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

    let searchTerm = query
      .replace(
        new RegExp(trigger.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
        '',
      )
      .trim()

    if (trigger === '?') {
      const baseUrl =
        FALLBACK_URLS[settings.fallback as keyof typeof FALLBACK_URLS] ||
        FALLBACK_URLS.google
      return baseUrl + encodeURIComponent('reddit ' + searchTerm)
    }

    const baseUrl = ALL_BANGS[trigger]

    if (!searchTerm) return new URL(baseUrl).origin

    return baseUrl + encodeURIComponent(searchTerm)
  }

  const fallbackBase =
    FALLBACK_URLS[settings.fallback as keyof typeof FALLBACK_URLS] ||
    FALLBACK_URLS.google

  return fallbackBase + encodeURIComponent(query)
}
