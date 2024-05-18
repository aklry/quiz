// @ts-ignore
/* eslint-disable */
import ryRequest from '@/services'

/** addQuestion POST /question/add */
export async function addQuestionUsingPost(
  body: API.QuestionAddRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseLong_>({
    method: 'POST',
    url: '/question/add',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** deleteQuestion POST /question/delete */
export async function deleteQuestionUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseBoolean_>({
    method: 'POST',
    url: '/question/delete',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** editQuestion POST /question/edit */
export async function editQuestionUsingPost(
  body: API.QuestionEditRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseBoolean_>({
    method: 'POST',
    url: '/question/edit',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** getQuestionVOById GET /question/get/vo */
export async function getQuestionVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseQuestionVO_>({
    method: 'GET',
    url: '/question/get/vo',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** listQuestionByPage POST /question/list/page */
export async function listQuestionByPageUsingPost(
  body: API.QuestionQueryRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponsePageQuestion_>({
    method: 'POST',
    url: '/question/list/page',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** listQuestionVOByPage POST /question/list/page/vo */
export async function listQuestionVoByPageUsingPost(
  body: API.QuestionQueryRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponsePageQuestionVO_>({
    method: 'POST',
    url: '/question/list/page/vo',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** listMyQuestionVOByPage POST /question/my/list/page/vo */
export async function listMyQuestionVoByPageUsingPost(
  body: API.QuestionQueryRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponsePageQuestionVO_>({
    method: 'POST',
    url: '/question/my/list/page/vo',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** updateQuestion POST /question/update */
export async function updateQuestionUsingPost(
  body: API.QuestionUpdateRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseBoolean_>({
    method: 'POST',
    url: '/question/update',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}
