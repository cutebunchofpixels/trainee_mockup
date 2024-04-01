import { UsersFetchErrorAction } from './fetchError'
import { UsersFetchStartAction } from './fetchStart'
import { UsersFetchSuccessAction } from './fetchSuccess'

export type UsersActions =
  | UsersFetchStartAction
  | UsersFetchSuccessAction
  | UsersFetchErrorAction

export * from './fetchStart'
export * from './fetchSuccess'
export * from './fetchError'
