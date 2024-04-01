import axios from 'axios'

import { GetUsersDto } from 'src/types/models/User/dto/GetUsersDto'
import { GorestUser } from 'src/types/models/User'

export class UserService {
  private static axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_GOREST_BASE_URL}/users`,
  })

  public static setAuthHeader(value?: string) {
    this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${value}`
  }

  static async getAll(dto: GetUsersDto) {
    const resp = await this.axiosInstance.get<GorestUser[]>('', {
      params: new URLSearchParams(dto as any),
    })

    return resp.data
  }

  static async update(id: number, dto: Partial<GorestUser>) {
    this.axiosInstance.patch(`/${id}`, {
      data: dto,
    })
  }
}
