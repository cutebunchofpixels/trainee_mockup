import axios from 'axios'

import { GetUsersDto } from 'src/types/dto/users/GetUsersDto'
import { GorestUser } from 'src/types/models/User'

export class UserService {
  private static axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_GOREST_BASE_URL}/users`,
  })

  public static setAuthHeader(value?: string) {
    this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${value}`
  }

  static async getAll(dto: GetUsersDto) {
    return this.axiosInstance.get<GorestUser>('', {
      params: new URLSearchParams(dto as any),
    })
  }

  static async update(id: number, dto: Partial<GorestUser>) {
    return this.axiosInstance.patch<GorestUser>(`/${id}`, {
      data: dto,
    })
  }
}
