<script setup lang="ts">
import { listAppByPageUsingPost, doAppReviewUsingPost } from '@/api/appController'
import { Message } from '@arco-design/web-vue'
import { formatDate } from '@/utils'
import { APP_TYPE, SCORING_STRATEGY, REVIEW_STATUS } from '@/constants'
import columns from './config'

const initSearchParams = {
  current: 1,
  pageSize: 10,
  sortField: 'createTime',
  sortOrder: 'descend'
}
const total = ref(0)
const searchParams = ref<API.AppQueryRequest>({
  ...initSearchParams
})
const formSearchParams = ref<API.AppQueryRequest>({})
const app = ref<API.AppVO[]>()
const fetchData = async () => {
  const res = await listAppByPageUsingPost({
    ...searchParams.value
  })
  if (res.code === 0 && res.data && res.data.records) {
    app.value = res.data.records
    total.value = Number(res.data.total)
  } else {
    Message.error('获取应用列表失败,' + res.message)
  }
}
// 根据条件搜索
const handleSubmit = () => {
  searchParams.value = {
    ...initSearchParams,
    ...formSearchParams.value
  }
}
// 审核APP
const doReview = async (app: API.AppVO, reviewStatus: number, reviewMessage: string) => {
  const res = await doAppReviewUsingPost({
    id: app.id,
    reviewStatus,
    reviewMessage
  })
  if (res.code === 0) {
    Message.success('操作成功')
    fetchData()
  } else {
    Message.error('操作失败,' + res.message)
  }
}
// 翻页获取数据
const handlePageChange = (current: number) => {
  searchParams.value = {
    ...initSearchParams,
    current
  }
}
watchEffect(() => {
  fetchData()
})
</script>
<template>
  <div class="app-container">
    <div class="app-search">
      <a-form :model="formSearchParams" layout="inline" @submit="handleSubmit">
        <a-form-item label="应用名称">
          <a-input v-model="formSearchParams.appName" placeholder="请输入应用名称" />
        </a-form-item>
        <a-form-item label="应用描述">
          <a-input v-model="formSearchParams.appDesc" placeholder="请输入应用描述" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">搜索</a-button>
        </a-form-item>
      </a-form>
    </div>
    <common-table
      :data="app"
      :columns="columns"
      :pagination-props="{
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total
      }"
      @page-change="handlePageChange"
    >
      <template #appIcon="{ record }">
        <a-image :src="record.appIcon" :width="50" :height="50" class="app-icon" />
      </template>
      <template #appType="{ record }">
        <a-tag :color="record.appType === 0 ? '#f53f3f' : '#19be6b'">{{
          APP_TYPE.APP_TYPE_MAP[record.appType]
        }}</a-tag>
      </template>
      <template #scoringStrategy="{ record }">
        <a-tag :color="record.scoringStrategy === 0 ? '#f53f3f' : '#19be6b'">{{
          SCORING_STRATEGY.APP_SCORING_STRATEGY_MAP[record.scoringStrategy]
        }}</a-tag>
      </template>
      <template #reviewStatus="{ record }">
        <a-tag :color="record.reviewStatus === 0 ? '#f53f3f' : '#19be6b'">{{
          REVIEW_STATUS.REVIEW_STATUS_MAP[record.reviewStatus]
        }}</a-tag>
      </template>
      <template #reviewTime="{ record }">
        {{ formatDate(record.reviewTime) }}
      </template>
      <template #createTime="{ record }">
        {{ formatDate(record.createTime) }}
      </template>
      <template #operation="{ record }">
        <a-space>
          <a-button
            status="success"
            v-if="record.reviewStatus !== REVIEW_STATUS.REVIEW_STATUS_ENUM.PASS"
            @click="doReview(record, REVIEW_STATUS.REVIEW_STATUS_ENUM.PASS, '通过')"
            >通过</a-button
          >
          <a-button
            status="warning"
            v-if="record.reviewStatus !== REVIEW_STATUS.REVIEW_STATUS_ENUM.REJECT"
            @click="doReview(record, REVIEW_STATUS.REVIEW_STATUS_ENUM.REJECT, '该应用非法')"
            >拒绝</a-button
          >
          <a-button>删除</a-button>
        </a-space>
      </template>
    </common-table>
  </div>
</template>

<style scoped lang="scss">
.app-icon {
  border-radius: 50%;
}
</style>
