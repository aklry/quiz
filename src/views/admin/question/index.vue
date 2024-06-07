<script setup lang="ts">
import { listQuestionByPageUsingPost, deleteQuestionUsingPost } from '@/api/questionController'
import { formatDate } from '@/utils'
import columns from './config'
import Message from '@arco-design/web-vue/es/message'

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

const formSearchParams = ref<API.QuestionQueryRequest>({})
const question = ref<API.Question[]>()

const fetchData = async () => {
  const res = await listQuestionByPageUsingPost({
    ...searchParams.value
  })
  if (res.code === 0 && res.data && res.data.records) {
    question.value = res.data.records
    total.value = Number(res.data.total)
  } else {
    Message.error('获取题目列表失败,' + res.message)
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
  const res = await deleteQuestionUsingPost({
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
  <div class="question-container">
    <div class="question-search">
      <a-form :model="formSearchParams" layout="inline" @submit="handleSubmit">
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
      <template #createTime="{ record }">
        {{ formatDate(record.createTime) }}
      </template>
      <template #operation="{ record }">
        <a-popconfirm title="确认删除吗？" @ok="handleDelete(record.id)">
          <a-button type="primary" status="danger" size="small">删除</a-button>
        </a-popconfirm>
      </template>
    </common-table>
  </div>
</template>

<style scoped lang="scss"></style>
