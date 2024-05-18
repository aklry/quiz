// @ts-ignore
/* eslint-disable */
import ryRequest from '@/services'

/** addScoringResult POST /scoringResult/add */
export async function addScoringResultUsingPost(
  body: API.ScoringResultAddRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseLong_>({
    method: 'POST',
    url: '/scoringResult/add',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** deleteScoringResult POST /scoringResult/delete */
export async function deleteScoringResultUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseBoolean_>({
    method: 'POST',
    url: '/scoringResult/delete',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** editScoringResult POST /scoringResult/edit */
export async function editScoringResultUsingPost(
  body: API.ScoringResultEditRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseBoolean_>({
    method: 'POST',
    url: '/scoringResult/edit',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** getScoringResultVOById GET /scoringResult/get/vo */
export async function getScoringResultVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getScoringResultVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseScoringResultVO_>({
    method: 'GET',
    url: '/scoringResult/get/vo',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** listScoringResultByPage POST /scoringResult/list/page */
export async function listScoringResultByPageUsingPost(
  body: API.ScoringResultQueryRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponsePageScoringResult_>({
    method: 'POST',
    url: '/scoringResult/list/page',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** listScoringResultVOByPage POST /scoringResult/list/page/vo */
export async function listScoringResultVoByPageUsingPost(
  body: API.ScoringResultQueryRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponsePageScoringResultVO_>({
    method: 'POST',
    url: '/scoringResult/list/page/vo',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** listMyScoringResultVOByPage POST /scoringResult/my/list/page/vo */
export async function listMyScoringResultVoByPageUsingPost(
  body: API.ScoringResultQueryRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponsePageScoringResultVO_>({
    method: 'POST',
    url: '/scoringResult/my/list/page/vo',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** updateScoringResult POST /scoringResult/update */
export async function updateScoringResultUsingPost(
  body: API.ScoringResultUpdateRequest,
  options?: { [key: string]: any }
) {
  return ryRequest.request<API.BaseResponseBoolean_>({
    method: 'POST',
    url: '/scoringResult/update',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}
