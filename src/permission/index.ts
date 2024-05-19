import router from '@/router'
import { useUserStore } from '@/stores/modules/user/user'
import AUTH_ENUM from './permission'
import { checkAuth } from './checkPermission'

router.beforeEach(async (to, from, next) => {
  // 判断用户是否登录
  const userStore = useUserStore()
  let loginUser = userStore.user as API.LoginUserVO
  if (!loginUser || !loginUser.userRole) {
    await userStore.fetchLoginUser()
    loginUser = userStore.user as API.LoginUserVO
  }
  // 获取跳转的路由所需要的权限
  const needAuth = (to.meta?.auth as string) ?? AUTH_ENUM.NOT_LOGIN
  // 要跳转的页面必须要登录
  if (needAuth !== AUTH_ENUM.NOT_LOGIN) {
    if (!loginUser || !loginUser.userRole || loginUser.userRole === AUTH_ENUM.NOT_LOGIN) {
      next({ path: '/login', query: { redirect: to.fullPath } })
    }
    // 已经登录，判断是否有权限访问该页面
    if (!checkAuth(loginUser, needAuth)) {
      // 没有权限，跳转到无权限页面
      next({ path: '/noAuth' })
    }
  }
  next()
})
