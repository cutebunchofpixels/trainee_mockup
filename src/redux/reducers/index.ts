import { combineReducers } from 'redux'
import { paymentStatsReducer } from './paymentStatsReducer'

export const rootReducer = combineReducers({
  paymentStats: paymentStatsReducer,
})
