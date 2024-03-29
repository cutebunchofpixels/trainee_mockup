import { GorestUser } from 'src/types/models/User'

export interface GetUsersDto extends Partial<GorestUser> {
  per_page: number
  page: number
}
