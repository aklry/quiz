<script setup lang="ts">
import {
  listScoringResultVoByPageUsingPost,
  updateScoringResultUsingPost,
  addScoringResultUsingPost,
  deleteScoringResultUsingPost
} from '@/api/scoringResultController'
import { Message } from '@arco-design/web-vue'
import type { IFormParams } from './type'
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
  pageSize: 10,
  sortField: 'createTime',
  sortOrder: 'descend'
}
const total = ref(0)
const updateId = ref('')
const paginationProps = ref(initPaginationProps)
// 获取数据
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
// 分页
const handlePaginationChange = (current: number) => {
  paginationProps.value = {
    ...initPaginationProps,
    current
  }
}
const form = reactive<IFormParams>({
  resultPicture: '',
  resultScoreRange: 0,
  resultDesc: '',
  resultName: '',
  resultProp: []
})
const handleEdit = (record: API.ScoringResultVO) => {
  const { id, resultName, resultDesc, resultPicture, resultProp, resultScoreRange } = record
  updateId.value = id || ''
  form.resultName = resultName || ''
  form.resultDesc = resultDesc || ''
  form.resultPicture = resultPicture || ''
  form.resultProp = resultProp || []
  form.resultScoreRange = resultScoreRange || 0
}
// 处理新增评分以及修改评分
const handleSubmit = async () => {
  if (!props.appId) return
  let res: API.BaseResponseBoolean_ | API.BaseResponseLong_
  if (updateId.value) {
    // 修改评分
    res = await updateScoringResultUsingPost({
      id: updateId.value,
      ...form
    })
  } else {
    res = await addScoringResultUsingPost({
      appId: props.appId,
      ...form
    })
  }
  if (res.code === 0) {
    Message.success('操作成功')
    form.resultPicture = ''
    form.resultProp = []
    form.resultName = ''
    form.resultDesc = ''
    form.resultScoreRange = 0
    fetchData()
  } else {
    Message.error('操作失败,' + res.message)
  }
}
// 处理删除
const handleDelete = async (record: API.ScoringResultVO) => {
  const res = await deleteScoringResultUsingPost({
    id: record.id
  })
  if (res.code === 0) {
    Message.success('删除成功')
    fetchData()
  } else {
    Message.error('删除失败,' + res.message)
  }
}
const imageUrl = computed(() => form.resultPicture)
watchEffect(() => {
  fetchData()
})
</script>

<template>
  <div class="add-scoring-result-container">
    <h2 class="font-bold text-lg pb-2">创建评分结果</h2>
    <a-form :model="form" class="form" @submit="handleSubmit">
      <a-form-item label="应用id">{{ appId }}</a-form-item>
      <a-form-item label="结果名称">
        <a-input v-model="form.resultName" placeholder="请输入结果名称" />
      </a-form-item>
      <a-form-item label="结果描述">
        <a-input v-model="form.resultDesc" placeholder="请输入结果描述" />
      </a-form-item>
      <a-form-item label="结果图片">
        <picture-upload
          biz="result_picture"
          :value="imageUrl"
          :on-change="(value) => (form.resultPicture = value)"
        />
      </a-form-item>
      <a-form-item label="结果集">
        <a-input-tag v-model="form.resultProp" placeholder="请输入结果集" />
      </a-form-item>
      <a-form-item label="结果得分范围">
        <a-input-number v-model="form.resultScoreRange" :min="0" :max="100" />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary">提交</a-button>
      </a-form-item>
    </a-form>
    <h2 class="font-bold text-lg pb-2">管理评分结果</h2>
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
        <!-- <a-avatar :imageUrl="record.resultPicture || image" :size="50" /> -->
        <a-image :src="record.resultPicture || image" :width="50" :height="50" class="circle" />
      </template>
      <template #operation="{ record }">
        <a-button size="mini" type="primary" class="mr-2" @click="handleEdit(record)">
          修改
        </a-button>
        <a-popconfirm content="确定要删除吗?" @ok="handleDelete(record)">
          <a-button status="danger" size="mini" type="primary">删除</a-button>
        </a-popconfirm>
      </template>
    </common-table>
  </div>
</template>

<style scoped lang="scss">
.add-scoring-result-container {
  box-sizing: border-box;
  .form {
    width: 500px;
  }
  .circle {
    border-radius: 50%;
  }
}
</style>
