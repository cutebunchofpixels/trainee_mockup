import { PayloadAction } from 'types/PayloadAction'

interface PaymentStatsState {
  totalRevenue: number
  averagePayment: number
  repeatPurchaseRate: number
}

const initialState: PaymentStatsState = {
  totalRevenue: 75000,
  averagePayment: 16,
  repeatPurchaseRate: 15,
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
