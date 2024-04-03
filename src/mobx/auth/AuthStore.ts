import { User } from 'firebase/auth'
import { makeAutoObservable } from 'mobx'

import { UserService } from 'src/api/users/UsersService'
import { ConfigService } from 'src/utils/ConfigService'

class AuthStore {
  constructor() {
    makeAutoObservable(this)
  }

  user: User | null = null
  isReady = false

  signin(user: User) {
    this.user = user
    const gorestApiKey = ConfigService.get('REACT_APP_GOREST_API_KEY')
    UserService.setAuthHeader(gorestApiKey)
  }

  signout() {
    this.user = null
    UserService.setAuthHeader(undefined)
  }

  setReady(value: boolean) {
    this.isReady = value
  }
}

export const authStore = new AuthStore()
