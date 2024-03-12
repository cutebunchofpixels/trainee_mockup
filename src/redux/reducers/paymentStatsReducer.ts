import { PaymentStatsCardInfo } from 'components/ui/PaymentStatCard'

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

export function paymentStatsReducer(state = initialState) {
  return state
}
