import { User } from '@firebase/auth'

import { AuthActions } from 'src/redux/actions/auth'

interface AuthState {
  user: User | null
  isReady: boolean
}

const initialState: AuthState = {
  user: null,
  isReady: false,
}

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case 'auth/setUser': {
      const newState: AuthState = {
        ...state,
        user: action.payload,
      }

      return newState
    }

    case 'auth/setReady': {
      const newState: AuthState = {
        ...state,
        isReady: action.payload,
      }

      return newState
    }
    default:
      return state
  }
}
