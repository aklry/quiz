import AUTH_ENUM from './permission'

/**
 *
 * @param loginUser 当前登录用户
 * @param auth 需要有的权限
 * @return 有无权限
 */
export const checkAuth = (
  loginUser: API.LoginUserVO,
  auth: string = AUTH_ENUM.NOT_LOGIN
): boolean => {
  const loginUserAuth = loginUser?.userRole ?? AUTH_ENUM.NOT_LOGIN
  if (auth === AUTH_ENUM.NOT_LOGIN) {
    return true
  }

  if (auth === AUTH_ENUM.USER) {
    if (loginUserAuth === AUTH_ENUM.NOT_LOGIN) {
      return false
    }
  }

  if (auth === AUTH_ENUM.ADMIN) {
    if (loginUserAuth !== AUTH_ENUM.ADMIN) {
      return false
    }
  }
  return true
}
