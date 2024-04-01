import { UserService } from 'src/api/users/UsersService'
import {
  usersFetchError,
  usersFetchStart,
  usersFetchSuccess,
} from 'src/redux/actions/users'
import { AppDispatch, RootState } from 'src/redux/app/store'
import { GetUsersDto } from 'src/types/models/User/dto/GetUsersDto'

export function fetchUsers(filters?: Partial<GetUsersDto>) {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    const state = getState()
    const storedFilters = state.users.filters
    let newFilters = { ...storedFilters }

    if (filters) {
      newFilters = { ...storedFilters, ...filters }
    }

    dispatch(usersFetchStart())

    try {
      const users = await UserService.getAll(newFilters)
      dispatch(usersFetchSuccess(users, newFilters))
    } catch (error) {
      dispatch(usersFetchError((error as Error).message))
    }
  }
}
