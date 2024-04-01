export type UsersFetchStartAction = {
  type: 'users/fetchStart'
}

export function usersFetchStart(): UsersFetchStartAction {
  return {
    type: 'users/fetchStart',
  }
}
