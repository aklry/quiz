<script setup lang="ts">
import {
  listMyUserAnswerVoByPageUsingPost,
  deleteUserAnswerUsingPost
} from '@/api/userAnswerController'
import columns from './config'
import { formatDate } from '@/utils'
import { APP_TYPE, SCORING_STRATEGY } from '@/constants'
import { Message } from '@arco-design/web-vue'

const initSearchParams = {
  current: 1,
  pageSize: 10,
  sortField: 'createTime',
  sortOrder: 'descend'
}
const total = ref(0)
const searchParams = ref<API.UserAnswerQueryRequest>({
  ...initSearchParams
})
const myAnswerList = ref<API.UserAnswerVO[]>([])
const handlePageChange = (current: number) => {
  searchParams.value = {
    ...initSearchParams,
    current
  }
}
const handleDelete = async (id: string) => {
  const res = await deleteUserAnswerUsingPost({
    id
  })
  if (res.code === 0) {
    Message.success('删除成功')
    fetchData()
  } else {
    Message.error('删除失败,' + res.message)
  }
}
const fetchData = async () => {
  const res = await listMyUserAnswerVoByPageUsingPost({
    ...searchParams.value
  })
  if (res.code === 0 && res.data && res.data.records) {
    myAnswerList.value = res.data.records
    total.value = Number(res.data.total)
  }
}
watchEffect(() => {
  fetchData()
})
</script>
<template>
  <div class="my-answer-container">
    <common-table
      :columns="columns"
      :data="myAnswerList"
      :pagination-props="{
        current: searchParams.current,
        pageSize: searchParams.pageSize,
        total
      }"
      @page-change="handlePageChange"
    >
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
      <template #resultPicture="{ record }">
        <a-image :src="record.resultPicture" :width="50" :height="50" class="result-picture" />
      </template>
      <template #createTime="{ record }">
        {{ formatDate(record.createTime) }}
      </template>
      <template #operation="{ record }">
        <a-space>
          <a-button
            type="primary"
            size="mini"
            class="mr-2"
            :href="`/answer/answerResult/${record.id}`"
            >查看结果</a-button
          >
          <a-popconfirm content="确认删除吗？" position="bottom" @ok="handleDelete(record.id)">
            <a-button status="danger" type="primary" size="mini">删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </common-table>
  </div>
</template>

<style scoped lang="scss">
.result-picture {
  border-radius: 50%;
}
</style>
