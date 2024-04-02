import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'

import { inferSelectedLocale } from 'src/utils/inferSelectedLocale'
import { ls } from 'src/utils/secureLS'
import { SELECTED_LOCALE_KEY } from 'src/utils/constants'
import { auth } from 'src/fb'
import { dayjs } from './utils/dayjs'

const selectedLocale = inferSelectedLocale()

i18next.on('languageChanged', locale => {
  ls.set(SELECTED_LOCALE_KEY, locale)
  document.documentElement.setAttribute('lang', locale)
  auth.languageCode = locale
  dayjs.locale(locale)
})

i18next
  .use(initReactI18next)
  .use(Backend)
  .init({
    fallbackLng: 'en',
    lng: selectedLocale,
    ns: ['translation', 'common'],
  })
