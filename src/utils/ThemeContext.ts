import { createContext } from 'react'
import { Theme } from 'types/Theme'

interface ThemeContextType {
  currentTheme: Theme
  setTheme: (value: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)
