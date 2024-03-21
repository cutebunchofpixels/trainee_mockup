import { ThemeActions } from 'src/redux/actions/theme'
import { Theme } from 'src/types/Theme'
import { inferePreferredTheme } from 'src/utils/inferPreferredTheme'

interface ThemeState {
  value: Theme
}

const preferredTheme = inferePreferredTheme()

const initialState: ThemeState = {
  value: preferredTheme,
}

export function themeReducer(state = initialState, action: ThemeActions) {
  switch (action.type) {
    case 'theme/toggle': {
      const newState: ThemeState = {
        ...state,
        value: state.value === Theme.Light ? Theme.Dark : Theme.Light,
      }
      return newState
    }
    case 'theme/set': {
      const newState: ThemeState = {
        ...state,
        value: action.payload,
      }
      return newState
    }
    default:
      return state
  }
}
