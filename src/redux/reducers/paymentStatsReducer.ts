import { PaymentStatsCardInfo } from 'components/ui/PaymentStatCard'
import { PayloadAction } from 'types/PayloadAction'

interface PaymentStatsState {
  value: PaymentStatsCardInfo[]
}

const initialState: PaymentStatsState = {
  value: [
    { value: 75000, type: 'currency', caption: 'Total revenue' },
    { value: 16, type: 'currency', caption: 'Average payment' },
    { value: 15, type: 'percentage', caption: 'Repeat purchase rate' },
  ],
}

export function paymentStatsReducer(
  state = initialState,
  action: PayloadAction<number>
) {
  switch (action.type) {
    default:
      return state
  }
}
