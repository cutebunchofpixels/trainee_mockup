import { GorestUser } from 'src/types/models/User'
import { GetUsersDto } from 'src/types/models/User/dto/GetUsersDto'

export type UsersFetchSuccessAction = {
  type: 'users/fetchSuccess'
  payload: {
    users: GorestUser[]
    filters: GetUsersDto
  }
}

export function usersFetchSuccess(
  users: GorestUser[],
  filters: GetUsersDto
): UsersFetchSuccessAction {
  return {
    type: 'users/fetchSuccess',
    payload: { users, filters },
  }
}
