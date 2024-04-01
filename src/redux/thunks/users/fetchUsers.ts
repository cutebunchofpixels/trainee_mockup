import { UserService } from 'src/api/users/UsersService'
import {
  usersFetchError,
  usersFetchStart,
  usersFetchSuccess,
} from 'src/redux/actions/users'
import { AppDispatch } from 'src/redux/app/store'
import { GetUsersDto } from 'src/types/models/User/dto/GetUsersDto'

export function fetchUsers(dto: GetUsersDto) {
  return async function (dispatch: AppDispatch) {
    dispatch(usersFetchStart())

    try {
      const users = await UserService.getAll(dto)
      dispatch(usersFetchSuccess(users))
    } catch (error) {
      dispatch(usersFetchError((error as Error).message))
    }
  }
}
