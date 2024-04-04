import { makeAutoObservable } from 'mobx'

import { Theme } from 'src/types/Theme'
import { PREFERED_THEME_KEY } from 'src/utils/constants'
import { inferePreferredTheme } from 'src/utils/inferPreferredTheme'
import { ls } from 'src/utils/secureLS'

class ThemeStore {
  constructor() {
    makeAutoObservable(this)
  }

  theme: Theme = inferePreferredTheme()

  toggleTheme() {
    const newTheme = this.theme === Theme.Dark ? Theme.Light : Theme.Dark
    this.theme = newTheme
    ls.set(PREFERED_THEME_KEY, newTheme)
  }
}

export const themeStore = new ThemeStore()
