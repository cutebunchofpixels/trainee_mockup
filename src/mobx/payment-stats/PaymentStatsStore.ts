import { makeAutoObservable } from 'mobx'
import { PaymentStatsCardInfo } from 'src/components/ui/PaymentStatCard'

const initialCards: PaymentStatsCardInfo[] = [
  {
    value: 75000,
    type: 'currency',
    captionKey: 'revenueStats.totalRevenue',
  },
  { value: 16, type: 'currency', captionKey: 'revenueStats.averagePayment' },
  {
    value: 15,
    type: 'percentage',
    captionKey: 'revenueStats.repeatPurchaseRate',
  },
]

class PaymentStatsStore {
  constructor() {
    makeAutoObservable(this)
  }

  cards: PaymentStatsCardInfo[] = initialCards
}

export const paymentStatsStore = new PaymentStatsStore()
