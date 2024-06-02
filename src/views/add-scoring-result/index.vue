<script setup lang="ts">
import { listScoringResultVoByPageUsingPost } from '@/api/scoringResultController'
import { Message } from '@arco-design/web-vue'
import image from '@/assets/logo.png'
import columns from './config'

const props = withDefaults(
  defineProps<{
    appId: string
  }>(),
  {
    appId: ''
  }
)
const tableData = ref<API.ScoringResultVO[]>([])
const initPaginationProps = {
  current: 1,
  pageSize: 5
}
const total = ref(0)
const paginationProps = ref(initPaginationProps)
const fetchData = async () => {
  const res = await listScoringResultVoByPageUsingPost({
    appId: props.appId,
    ...paginationProps.value
  })
  if (res.code === 0) {
    if (res.data && res.data.records && res.data.records.length > 0) {
      tableData.value = res.data.records
      total.value = Number(res.data.total)
    }
  } else {
    Message.error('数据获取失败,' + res.message)
  }
}
const handlePaginationChange = (current: number) => {
  paginationProps.value = {
    ...initPaginationProps,
    current
  }
}
watchEffect(() => {
  fetchData()
})
</script>

<template>
  <div class="add-scoring-result-container">
    <common-table
      :columns="columns"
      :data="tableData"
      :paginationProps="{
        current: paginationProps.current,
        pageSize: paginationProps.pageSize,
        total
      }"
      @page-change="handlePaginationChange"
    >
      <template #resultPicture="{ record }">
        <a-avatar :imageUrl="record.resultPicture || image" :size="50" />
      </template>
    </common-table>
  </div>
</template>

<style scoped lang="scss"></style>
