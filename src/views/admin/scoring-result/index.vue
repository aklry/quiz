<script setup lang="ts">
import {
  listScoringResultByPageUsingPost,
  deleteScoringResultUsingPost
} from '@/api/scoringResultController'
import { formatDate } from '@/utils'
import columns from './config'
import Message from '@arco-design/web-vue/es/message'

const initSearchParams = {
  current: 1,
  pageSize: 10
}
const total = ref(0)
const searchParams = ref<API.AppQueryRequest>({
  ...initSearchParams
})

const formSearchParams = ref<API.ScoringResultQueryRequest>({})
const question = ref<API.ScoringResult[]>()

const fetchData = async () => {
  const res = await listScoringResultByPageUsingPost({
    ...searchParams.value
  })
  if (res.code === 0 && res.data && res.data.records) {
    question.value = res.data.records
    total.value = Number(res.data.total)
  } else {
    Message.error('获取结果列表失败,' + res.message)
  }
}
// 根据条件搜索
const handleSubmit = () => {
  searchParams.value = {
    ...initSearchParams,
    ...formSearchParams.value
  }
}
// 翻页获取数据
const handlePageChange = (current: number) => {
  searchParams.value = {
    ...initSearchParams,
    current
  }
}
// 删除
const handleDelete = async (id: string) => {
  const res = await deleteScoringResultUsingPost({
    id
  })
  if (res.code === 0) {
    Message.success('删除成功')
    fetchData()
  } else {
    Message.error('删除失败,' + res.message)
  }
}
watchEffect(() => {
  fetchData()
})
</script>
<template>
  <div class="scoring-result-container">
    <div class="question-search">
      <a-form :model="formSearchParams" layout="inline" @submit="handleSubmit">
        <a-form-item label="结果名称">
          <a-input v-model="formSearchParams.resultName" placeholder="请输入结果名称" />
        </a-form-item>
        <a-form-item label="结果描述">
          <a-input v-model="formSearchParams.resultDesc" placeholder="请输入结果描述" />
        </a-form-item>
        <a-form-item label="应用id">
          <a-input v-model="formSearchParams.appId" placeholder="请输入应用id" />
        </a-form-item>
        <a-form-item label="用户id">
          <a-input v-model="formSearchParams.userId" placeholder="请输入用户id" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">搜索</a-button>
        </a-form-item>
      </a-form>
    </div>
    <common-table
      :data="question"
      :columns="columns"
      :pagination-props="{
        total,
        current: searchParams.current,
        pageSize: searchParams.pageSize
      }"
      @page-change="handlePageChange"
    >
      <template #resultPicture="{ record }">
        <a-image :src="record.resultPicture" :width="50" height="50" style="border-radius: 50%" />
      </template>
      <template #createTime="{ record }">
        {{ formatDate(record.createTime) }}
      </template>
      <template #operation="{ record }">
        <a-popconfirm content="确认删除吗？" @ok="handleDelete(record.id)">
          <a-button type="primary" status="danger" size="small">删除</a-button>
        </a-popconfirm>
      </template>
    </common-table>
  </div>
</template>

<style scoped lang="scss"></style>
