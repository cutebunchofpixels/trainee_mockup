export type SetAuthReadyAction = {
  type: 'auth/setReady'
  payload: boolean
}

export function setAuthReady(isReady: boolean): SetAuthReadyAction {
  return {
    type: 'auth/setReady',
    payload: isReady,
  }
}
