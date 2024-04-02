import { GorestUser } from 'src/types/models/User'
import { UsersActions } from '../actions/users'
import { GetUsersDto } from 'src/types/models/User/dto/GetUsersDto'
import { mockUsers } from 'src/components/layout/UsersTable/mockUsers'

interface UsersState {
  loading: boolean
  data: GorestUser[]
  filters: GetUsersDto
  totalPages: number
  error: string | null
}

export const USERS_PER_PAGE = 8

const defaultFilters: GetUsersDto = {
  page: 1,
  per_page: USERS_PER_PAGE,
}

const initialState: UsersState = {
  loading: false,
  data: [],
  filters: defaultFilters,
  totalPages: 0,
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
      const { users, filters, totalPages } = action.payload

      const newState = {
        ...state,
        loading: false,
        data: users,
        filters,
        totalPages,
        error: null,
      }

      return newState
    }

    case 'users/fetchError': {
      const newState = {
        ...state,
        loading: false,
        data: [],
        filters: defaultFilters,
        totalPages: 0,
        error: action.payload,
      }

      return newState
    }

    default:
      return state
  }
}
