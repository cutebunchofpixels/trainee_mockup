import { SetUserAction } from './setUser'
import { SetAuthReadyAction } from './setAuthReady'

export type AuthActions = SetUserAction | SetAuthReadyAction

export * from './setUser'
export * from './setAuthReady'
