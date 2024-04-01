import { GorestUser } from 'src/types/models/User'
import { UsersActions } from '../actions/users'

interface UsersState {
  loading: boolean
  data: GorestUser[]
  error: string | null
}

const initialState: UsersState = {
  loading: false,
  data: [],
  error: null,
}

export function usersReducer(
  state = initialState,
  action: UsersActions
): UsersState {
  switch (action.type) {
    case 'users/fetchStart': {
      const newState = {
        ...state,
        loading: true,
      }

      return newState
    }

    case 'users/fetchSuccess': {
      const newState = {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      }

      return newState
    }

    case 'users/fetchError': {
      const newState = {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      }

      return newState
    }

    default:
      return state
  }
}
