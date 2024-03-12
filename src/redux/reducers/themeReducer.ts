import { ThemeActions } from 'redux/actions/theme'
import { Theme } from 'types/Theme'

interface ThemeState {
  value: Theme
}

const initialState: ThemeState = {
  value: Theme.Light,
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
