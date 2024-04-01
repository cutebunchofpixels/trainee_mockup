import { GorestUser } from 'src/types/models/User'

export type UsersFetchSuccessAction = {
  type: 'users/fetchSuccess'
  payload: GorestUser[]
}

export function usersFetchSuccess(
  users: GorestUser[]
): UsersFetchSuccessAction {
  return {
    type: 'users/fetchSuccess',
    payload: users,
  }
}
