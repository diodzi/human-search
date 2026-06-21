export interface UserSettings {
  fallback: string
  customBangs: Record<string, string>
}

const DEFAULT_SETTINGS: UserSettings = {
  fallback: 'google',
  customBangs: {},
}

export function getSettings(): UserSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS
  const saved = localStorage.getItem('humansearch-settings')
  return saved ? JSON.parse(saved) : DEFAULT_SETTINGS
}

export function saveSettings(settings: UserSettings) {
  localStorage.setItem('humansearch-settings', JSON.stringify(settings))
}
