import { setTheme } from 'src/redux/actions/theme'
import { AppDispatch, RootState } from 'src/redux/app/store'
import { Theme } from 'src/types/Theme'
import { PREFERED_THEME_KEY } from 'src/utils/constants'
import { ls } from 'src/utils/secureLS'

export function toggleTheme() {
  return function (dispatch: AppDispatch, getState: () => RootState) {
    const state = getState()
    const currentTheme = state.theme.value
    const newTheme = currentTheme === Theme.Dark ? Theme.Light : Theme.Dark
    dispatch(setTheme(newTheme))
    ls.set(PREFERED_THEME_KEY, newTheme)
  }
}
