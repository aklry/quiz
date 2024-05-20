import { defineStore } from 'pinia'
import store from '@/stores'
import type { IUserState } from './type'
import { getLoginUserUsingGet, userLoginUsingPost } from '@/api/userController'
import AUTH_ENUM from '@/permission/permission'

const useUserStoreHooks = defineStore('user', {
  state: (): IUserState => ({
    user: null
  }),
  actions: {
    setUser(user: IUserState['user']) {
      this.user = user
    },
    async fetchLoginUser() {
      const { data } = await getLoginUserUsingGet()
      this.setUser(data)
    },
    async login(data: API.UserLoginRequest) {
      const { data: user } = await userLoginUsingPost(data)
      if (data) {
        this.setUser(user)
        return 'ok'
      } else {
        this.setUser({ userRole: AUTH_ENUM.NOT_LOGIN })
      }
    }
  }
})

export const useUserStore = () => useUserStoreHooks(store)
