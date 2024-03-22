import { Dayjs } from 'dayjs'

export function minDate(date?: Dayjs, referenceDate?: Dayjs) {
  if (
    !date ||
    !referenceDate ||
    date.isSame(referenceDate) ||
    date.isBefore(referenceDate)
  ) {
    return Promise.resolve()
  }

  return Promise.reject()
}
