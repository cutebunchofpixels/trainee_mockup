import { Locale } from 'src/types/Locale'
import { ls } from './secureLS'
import { SELECTED_LOCALE_KEY } from './constants'

export function inferSelectedLocale(): Locale {
  const persistedLocale = ls.get(SELECTED_LOCALE_KEY)

  if (persistedLocale) {
    return persistedLocale as Locale
  }

  return Locale.English
}
