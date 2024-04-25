import axios from 'axios'

import { GorestUser } from 'src/types/models/User'
import { GetUserDto } from 'src/types/models/User/dto/GetUserDto'
import { GetUsersDto } from 'src/types/models/User/dto/GetUsersDto'
import { toURLSearchParams } from 'src/utils/toURLSearchParams'

export class UserService {
  private static axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_GOREST_BASE_URL}/users`,
  })

  public static setAuthHeader(value?: string) {
    this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${value}`
  }

  static async getAll(
    filters: Partial<GorestUser>,
    page: number,
    pageSize: number
  ) {
    const params = toURLSearchParams({
      ...filters,
      page,
      per_page: pageSize,
    })

    const { data: response } = await this.axiosInstance.get<GetUsersDto>('', {
      params,
    })

    return {
      totalPages: response.meta.pagination.pages,
      users: response.data,
    }
  }

  static async getById(id: number) {
    const { data: response } = await this.axiosInstance.get<GetUserDto>(
      `/${id}`
    )
    return response.data
  }

  static async update(id: number, dto: Partial<GorestUser>) {
    console.log(dto)

    this.axiosInstance.patch(`/${id}`, {
      ...dto,
    })
  }
}
