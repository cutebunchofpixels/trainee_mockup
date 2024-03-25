import baseDayJs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

baseDayJs.extend(utc)
baseDayJs.extend(timezone)
baseDayJs.tz.setDefault(baseDayJs.tz.guess())

export const dayjs = baseDayJs
