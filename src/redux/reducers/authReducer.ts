import { User } from '@firebase/auth'

import { AuthActions } from 'redux/actions/auth'

interface AuthState {
  user: User | null
}

const initialState: AuthState = {
  user: null,
}

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case 'user/set': {
      const newState: AuthState = {
        ...state,
        user: action.payload,
      }
      return newState
    }
    default:
      return state
  }
}
