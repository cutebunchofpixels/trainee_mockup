import { PayloadAction } from 'types/PayloadAction'
import { Theme } from 'types/Theme'

interface ThemeState {
  value: Theme
}

const initialState: ThemeState = {
  value: Theme.Light,
}

export function themeReducer(state = initialState, action: PayloadAction) {
  switch (action.type) {
    case 'theme/toggle': {
      const newState: ThemeState = {
        ...state,
        value: state.value === Theme.Light ? Theme.Dark : Theme.Light,
      }
      return newState
    }
    default:
      return state
  }
}
