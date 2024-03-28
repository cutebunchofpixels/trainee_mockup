import baseDayJs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/en'
import 'dayjs/locale/he'

import { inferSelectedLocale } from './inferSelectedLocale'

baseDayJs.extend(utc)
baseDayJs.extend(timezone)
baseDayJs.tz.setDefault(baseDayJs.tz.guess())

const locale = inferSelectedLocale()
baseDayJs.locale(locale)

export const dayjs = baseDayJs
