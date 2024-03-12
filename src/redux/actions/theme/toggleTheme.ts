import { PayloadAction } from 'types/PayloadAction'

export function toggleTheme(): PayloadAction {
  return {
    type: 'theme/toggle',
    payload: null,
  }
}
