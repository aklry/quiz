import { defineStore } from 'pinia'
import store from '@/stores'
import type { IUserState } from './type'
import { getLoginUserUsingGet, userLoginUsingPost, userLogoutUsingPost } from '@/api/userController'
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
      const res = await userLoginUsingPost(data)
      if (res.code === 0) {
        this.setUser(res.data)
        return 'ok'
      } else {
        this.setUser({ userRole: AUTH_ENUM.NOT_LOGIN })
        return res.message
      }
    },
    async logout() {
      await userLogoutUsingPost()
      this.setUser(null)
    }
  }
})

export const useUserStore = () => useUserStoreHooks(store)
