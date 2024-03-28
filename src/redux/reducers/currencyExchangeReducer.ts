import { CurrencyExchangeActions } from 'src/redux/actions/currencyExchange'
import { CurrencyExchangeRates } from 'src/types/models/CurrencyExchangeRates'

interface CurrencyExchangeState {
  loading: boolean
  data: CurrencyExchangeRates[]
  startDate: string | null
  endDate: string | null
  error: string | null
}

const initialState: CurrencyExchangeState = {
  loading: false,
  data: [],
  startDate: null,
  endDate: null,
  error: null,
}

export function currencyExchangeReducer(
  state = initialState,
  action: CurrencyExchangeActions
): CurrencyExchangeState {
  switch (action.type) {
    case 'currencyExchange/fetchStart': {
      const newState = {
        ...state,
        loading: true,
      }

      return newState
    }

    case 'currencyExchange/fetchSuccess': {
      const { exchangeRates, startDate, endDate } = action.payload

      const newState = {
        ...state,
        loading: false,
        data: exchangeRates,
        startDate,
        endDate,
        error: null,
      }

      return newState
    }

    case 'currencyExchange/fetchError': {
      const newState = {
        ...state,
        loading: false,
        data: [],
        startDate: null,
        endDate: null,
        error: action.payload,
      }

      return newState
    }

    default:
      return state
  }
}
