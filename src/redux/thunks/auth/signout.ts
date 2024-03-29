import { UserService } from 'src/api/users/UsersService'
import { setUser } from 'src/redux/actions/auth'

import { AppDispatch } from 'src/redux/app/store'

export function signout() {
  return async function (dispatch: AppDispatch) {
    dispatch(setUser(null))
    UserService.setAuthHeader(undefined)
  }
}
