export type ToggleThemeAction = {
  type: 'theme/toggle'
}

export function toggleTheme(): ToggleThemeAction {
  return {
    type: 'theme/toggle',
  }
}
