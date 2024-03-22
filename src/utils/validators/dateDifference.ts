import { Dayjs, ManipulateType } from 'dayjs'

interface DateValidationOptions {
  minDifference?: { value: number; unit: ManipulateType }
  maxDifference?: { value: number; unit: ManipulateType }
}

export function dateDifference(
  date1?: Dayjs,
  date2?: Dayjs,
  options: DateValidationOptions = {}
) {
  const { minDifference, maxDifference } = options

  if (!date1 || !date2) {
    return Promise.resolve()
  }

  if (
    minDifference &&
    date1.diff(date2, minDifference.unit) < minDifference.value
  ) {
    return Promise.reject()
  }

  if (
    maxDifference &&
    date1.diff(date2, maxDifference.unit) > maxDifference.value
  ) {
    return Promise.reject()
  }

  return Promise.resolve()
}
