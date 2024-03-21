import { CurrencyExchangeActions } from 'src/redux/actions/currencyExchange'
import { CurrencyExchangeRates } from 'src/types/models/CurrencyExchangeRates'

interface CurrencyExchangeState {
  loading: boolean
  data: CurrencyExchangeRates[]
  error: string | null
}

const initialState: CurrencyExchangeState = {
  loading: false,
  data: [],
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
      const newState = {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      }

      return newState
    }

    case 'currencyExchange/fetchError': {
      const newState = {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      }

      return newState
    }

    default:
      return state
  }
}
