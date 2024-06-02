<script setup lang="ts">
import { listScoringResultVoByPageUsingPost } from '@/api/scoringResultController'
import { Message } from '@arco-design/web-vue'
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
const fetchData = async () => {
  const res = await listScoringResultVoByPageUsingPost({
    appId: props.appId,
    current: 1,
    pageSize: 10
  })
  if (res.code === 0) {
    res.data?.records && (tableData.value = res.data.records)
  } else {
    Message.error('数据获取失败,' + res.message)
  }
}
watchEffect(() => {
  fetchData()
})
</script>

<template>
  <div class="add-scoring-result-container">
    <common-table :columns="columns" :data="tableData"> </common-table>
  </div>
</template>

<style scoped lang="scss"></style>
