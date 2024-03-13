import { Locale } from 'types/Locale'
import heIL from 'antd/locale/he_IL'
import enUS from 'antd/locale/en_US'

export const PREFERED_THEME_KEY = 'preferredTheme'
export const locales = {
  [Locale.English]: enUS,
  [Locale.Hebrew]: heIL,
}
