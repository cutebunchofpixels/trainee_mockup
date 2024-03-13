import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import { inferSelectedLocale } from 'utils/inferSelectedLocale'

const selectedLocale = inferSelectedLocale()

i18next.use(initReactI18next).use(Backend).init({
  fallbackLng: 'en',
  lng: selectedLocale,
})
