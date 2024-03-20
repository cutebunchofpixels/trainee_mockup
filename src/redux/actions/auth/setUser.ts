import { User } from '@firebase/auth'

export type SetUserAction = {
  type: 'auth/setUser'
  payload: User | null
}

export function setUser(user: User | null): SetUserAction {
  return {
    type: 'auth/setUser',
    payload: user,
  }
}
