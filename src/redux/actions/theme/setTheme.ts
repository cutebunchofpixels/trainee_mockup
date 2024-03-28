import { Theme } from 'src/types/Theme'

export type SetThemeAction = {
  type: 'theme/set'
  payload: Theme
}

export function setTheme(theme: Theme): SetThemeAction {
  return {
    type: 'theme/set',
    payload: theme,
  }
}
