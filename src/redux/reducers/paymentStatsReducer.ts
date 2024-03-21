import { PaymentStatsCardInfo } from 'src/components/ui/PaymentStatCard'

interface PaymentStatsState {
  value: PaymentStatsCardInfo[]
}

const initialState: PaymentStatsState = {
  value: [
    { value: 75000, type: 'currency', captionKey: 'revenueStats.totalRevenue' },
    { value: 16, type: 'currency', captionKey: 'revenueStats.averagePayment' },
    {
      value: 15,
      type: 'percentage',
      captionKey: 'revenueStats.repeatPurchaseRate',
    },
  ],
}

export function paymentStatsReducer(state = initialState) {
  return state
}
