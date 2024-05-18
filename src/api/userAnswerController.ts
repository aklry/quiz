// @ts-ignore
/* eslint-disable */
import ryRequest from '@/services'

/** addUserAnswer POST /userAnswer/add */
export async function addUserAnswerUsingPost(
  body: API.UserAnswerAddRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseLong_>({
    method: 'POST',
    url: '/userAnswer/add',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** deleteUserAnswer POST /userAnswer/delete */
export async function deleteUserAnswerUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseBoolean_>({
    method: 'POST',
    url: '/userAnswer/delete',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** editUserAnswer POST /userAnswer/edit */
export async function editUserAnswerUsingPost(
  body: API.UserAnswerEditRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseBoolean_>({
    method: 'POST',
    url: '/userAnswer/edit',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** getUserAnswerVOById GET /userAnswer/get/vo */
export async function getUserAnswerVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserAnswerVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseUserAnswerVO_>({
    method: 'GET',
    url: '/userAnswer/get/vo',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** listUserAnswerByPage POST /userAnswer/list/page */
export async function listUserAnswerByPageUsingPost(
  body: API.UserAnswerQueryRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponsePageUserAnswer_>({
    method: 'POST',
    url: '/userAnswer/list/page',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** listUserAnswerVOByPage POST /userAnswer/list/page/vo */
export async function listUserAnswerVoByPageUsingPost(
  body: API.UserAnswerQueryRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponsePageUserAnswerVO_>({
    method: 'POST',
    url: '/userAnswer/list/page/vo',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** listMyUserAnswerVOByPage POST /userAnswer/my/list/page/vo */
export async function listMyUserAnswerVoByPageUsingPost(
  body: API.UserAnswerQueryRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponsePageUserAnswerVO_>({
    method: 'POST',
    url: '/userAnswer/my/list/page/vo',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** updateUserAnswer POST /userAnswer/update */
export async function updateUserAnswerUsingPost(
  body: API.UserAnswerUpdateRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseBoolean_>({
    method: 'POST',
    url: '/userAnswer/update',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}
