import { combineReducers } from 'redux'

import { paymentStatsReducer } from './paymentStatsReducer'
import { themeReducer } from './themeReducer'
import { authReducer } from './authReducer'
import { currencyExchangeReducer } from './currencyExchangeReducer'

export const rootReducer = combineReducers({
  paymentStats: paymentStatsReducer,
  theme: themeReducer,
  auth: authReducer,
  currencyExchange: currencyExchangeReducer,
})
