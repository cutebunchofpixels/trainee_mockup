import { User } from 'firebase/auth'
import { UserService } from 'src/api/users/UsersService'
import { setUser } from 'src/redux/actions/auth'

import { AppDispatch } from 'src/redux/app/store'
import { ConfigService } from 'src/utils/ConfigService'

export function signin(user: User) {
  return async function (dispatch: AppDispatch) {
    dispatch(setUser(user))
    const gorestApiKey = ConfigService.get('REACT_APP_GOREST_API_KEY')
    UserService.setAuthHeader(gorestApiKey)
  }
}
