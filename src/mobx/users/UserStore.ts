import { makeAutoObservable, reaction, runInAction } from 'mobx'

import { UserService } from 'src/api/users/UsersService'
import { mockUsers } from 'src/components/layout/UsersTable/mockUsers'
import { GorestUser } from 'src/types/models/User'

const USERS_PAGE_SIZE = 8

class UserStore {
  constructor() {
    makeAutoObservable(this)
  }

  users: GorestUser[] = mockUsers

  filters: Partial<GorestUser> = {}
  page = 1
  pageSize = USERS_PAGE_SIZE
  totalPages = 0
  needsUpdate = false

  isLoading = false
  error: string | null = null

  async initStore() {
    await this.fetchUsers(this.filters, this.page, this.pageSize)
  }

  get isEmpty() {
    return this.users.length === 0
  }

  setPagination(page: number, pageSize: number) {
    this.page = page
    this.pageSize = pageSize
  }

  setFilters(filters: Partial<GorestUser>) {
    this.filters = { ...this.filters, ...filters }
    this.page = 1
  }

  invalidate() {
    this.needsUpdate = true
  }

  async fetchUsers(
    filters: Partial<GorestUser>,
    page: number,
    pageSize: number
  ) {
    let newFilters = this.filters

    if (filters !== this.filters) {
      newFilters = { ...this.filters, ...filters }
    }

    this.isLoading = true

    try {
      const { users, totalPages } = await UserService.getAll(
        newFilters,
        page,
        pageSize
      )
      runInAction(() => {
        this.users = users

        this.filters = newFilters
        this.page = page
        this.pageSize = pageSize
        this.totalPages = totalPages

        this.error = null
      })
    } catch (error) {
      runInAction(() => {
        this.users = []

        this.filters = {}
        this.page = 1
        this.pageSize = USERS_PAGE_SIZE
        this.totalPages = 0

        this.error = (error as Error).message
      })
    }

    runInAction(() => {
      this.isLoading = false
    })
  }
}

export const userStore = new UserStore()

userStore.initStore()

reaction(
  () => ({
    filters: userStore.filters,
    page: userStore.page,
    pageSize: userStore.pageSize,
  }),
  ({ filters, page, pageSize }) => {
    userStore.fetchUsers(filters, page, pageSize)
  }
)

reaction(
  () => ({ needsUpdate: userStore.needsUpdate }),
  ({ needsUpdate }) => {
    const { filters, page, pageSize } = userStore
    if (needsUpdate) {
      userStore.needsUpdate = false
      userStore.fetchUsers(filters, page, pageSize)
    }
  }
)
