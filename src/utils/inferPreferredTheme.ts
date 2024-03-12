import { ls } from './secureLS'
import { PREFERED_THEME_KEY } from './constants'
import { Theme } from 'types/Theme'

export function inferePreferredTheme() {
  const persistedPreference = ls.get(PREFERED_THEME_KEY)

  if (persistedPreference) {
    return persistedPreference as Theme
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  if (mediaQuery.matches) {
    return Theme.Dark
  }

  return Theme.Light
}
