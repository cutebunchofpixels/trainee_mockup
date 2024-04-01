export type UsersFetchErrorAction = {
  type: 'users/fetchError'
  payload: string
}

export function usersFetchError(errorMessage: string): UsersFetchErrorAction {
  return {
    type: 'users/fetchError',
    payload: errorMessage,
  }
}
