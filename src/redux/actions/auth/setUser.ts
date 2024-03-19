import { User } from '@firebase/auth'

export type SetUserAction = {
  type: 'user/set'
  payload: User | null
}

export function setUser(user: User | null): SetUserAction {
  return {
    type: 'user/set',
    payload: user,
  }
}
