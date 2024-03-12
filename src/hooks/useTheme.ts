import { useContext } from 'react'
import { ThemeContext } from 'utils/ThemeContext'

export default function useTheme() {
  const context = useContext(ThemeContext)

  if (context === null) {
    throw new Error('Theme context has not been provided')
  }

  return context
}
