import { GorestUser } from 'src/types/models/User'
import { GetUsersDto } from 'src/types/models/User/dto/GetUsersDto'

export type UsersFetchSuccessAction = {
  type: 'users/fetchSuccess'
  payload: {
    users: GorestUser[]
    filters: GetUsersDto
    totalPages: number
  }
}

export function usersFetchSuccess(
  users: GorestUser[],
  filters: GetUsersDto,
  totalPages: number
): UsersFetchSuccessAction {
  return {
    type: 'users/fetchSuccess',
    payload: { users, filters, totalPages },
  }
}
