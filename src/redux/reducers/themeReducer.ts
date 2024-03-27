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
