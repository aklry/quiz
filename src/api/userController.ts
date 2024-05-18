// @ts-ignore
/* eslint-disable */
import ryRequest from '@/services'

/** addUser POST /user/add */
export async function addUserUsingPost(body: API.UserAddRequest, options?: { [key: string]: any }) {
  return ryRequest.request<API.BaseResponseLong_>({
    method: 'POST',
    url: '/user/add',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** deleteUser POST /user/delete */
export async function deleteUserUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseBoolean_>({
    method: 'POST',
    url: '/user/delete',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** getUserById GET /user/get */
export async function getUserByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseUser_>({
    method: 'GET',
    url: '/user/get',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** getLoginUser GET /user/get/login */
export async function getLoginUserUsingGet(options?: { [key: string]: any }) {
  return ryRequest.request<API.BaseResponseLoginUserVO_>({
    method: 'GET',
    url: '/user/get/login',
    ...(options || {})
  })
}

/** getUserVOById GET /user/get/vo */
export async function getUserVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseUserVO_>({
    method: 'GET',
    url: '/user/get/vo',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** listUserByPage POST /user/list/page */
export async function listUserByPageUsingPost(
  body: API.UserQueryRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponsePageUser_>({
    method: 'POST',
    url: '/user/list/page',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** listUserVOByPage POST /user/list/page/vo */
export async function listUserVoByPageUsingPost(
  body: API.UserQueryRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponsePageUserVO_>({
    method: 'POST',
    url: '/user/list/page/vo',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** userLogin POST /user/login */
export async function userLoginUsingPost(
  body: API.UserLoginRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseLoginUserVO_>({
    method: 'POST',
    url: '/user/login',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** userLogout POST /user/logout */
export async function userLogoutUsingPost(options?: { [key: string]: any }) {
  return ryRequest.request<API.BaseResponseBoolean_>({
    method: 'POST',
    url: '/user/logout',
    ...(options || {})
  })
}

/** userRegister POST /user/register */
export async function userRegisterUsingPost(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseLong_>({
    method: 'POST',
    url: '/user/register',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** updateUser POST /user/update */
export async function updateUserUsingPost(
  body: API.UserUpdateRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseBoolean_>({
    method: 'POST',
    url: '/user/update',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** updateMyUser POST /user/update/my */
export async function updateMyUserUsingPost(
  body: API.UserUpdateMyRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseBoolean_>({
    method: 'POST',
    url: '/user/update/my',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}
