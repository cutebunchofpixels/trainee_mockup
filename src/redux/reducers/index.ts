import { combineReducers } from 'redux'

import { paymentStatsReducer } from './paymentStatsReducer'
import { themeReducer } from './themeReducer'

export const rootReducer = combineReducers({
  paymentStats: paymentStatsReducer,
  theme: themeReducer,
})
