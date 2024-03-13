import { Locale } from 'types/Locale'
import heIL from 'antd/locale/he_IL'
import enUS from 'antd/locale/en_US'

export const PREFERED_THEME_KEY = 'preferredTheme'
export const SELECTED_LOCALE_KEY = 'selectedLocale'
export const locales = {
  [Locale.English]: enUS,
  [Locale.Hebrew]: heIL,
}
