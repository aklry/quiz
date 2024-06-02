<script setup lang="ts">
import { addAppUsingPost, getAppVoByIdUsingGet, editAppUsingPost } from '@/api/appController'
import { Message } from '@arco-design/web-vue'

const router = useRouter()
const appForm = reactive<API.AppAddRequest>({
  appName: '',
  appDesc: '',
  appType: 0,
  appIcon: '',
  scoringStrategy: 0
})
const props = defineProps<{ appId?: string }>()
onMounted(async () => {
  if (props.appId) {
    const result = await getAppVoByIdUsingGet({
      id: props.appId
    })
    if (result.code === 0 && result.data) {
      const app = result.data
      appForm.appName = app.appName
      appForm.appDesc = app.appDesc
      appForm.appType = app.appType
      appForm.appIcon = app.appIcon
      appForm.scoringStrategy = app.scoringStrategy
    } else {
      Message.error('获取应用信息失败,' + result.message)
    }
  }
})
const handleAddOrEditApp = async () => {
  let res: API.BaseResponseBoolean_ | API.BaseResponseLong_
  if (props.appId) {
    res = await editAppUsingPost({
      id: props.appId,
      ...appForm
    })
  } else {
    res = await addAppUsingPost(appForm)
  }
  if (res.code === 0) {
    Message.success('操作成功, 即将跳转到应用详情页')
    setTimeout(async () => {
      await router.push({
        name: 'AppDetail',
        params: { appId: typeof res.data === 'boolean' ? props.appId : res.data }
      })
    }, 3000)
  } else {
    Message.error('操作失败,' + res.message)
  }
}
</script>

<template>
  <div class="add-app-container flex justify-center items-center flex-col">
    <div class="flex mb-4">
      <h1 class="text-xl font-bold">创建应用</h1>
    </div>
    <div class="add-form">
      <a-form :model="appForm" auto-label-width @submit="handleAddOrEditApp">
        <a-form-item label="应用名称">
          <a-input v-model="appForm.appName" />
        </a-form-item>
        <a-form-item label="应用描述">
          <a-input v-model="appForm.appDesc" />
        </a-form-item>
        <a-form-item label="应用图标">
          <PictureUpload
            biz="app_icon"
            :on-change="(res) => (appForm.appIcon = res)"
            :value="appForm.appIcon"
          />
        </a-form-item>
        <a-form-item label="应用类型">
          <a-select v-model="appForm.appType">
            <a-option :value="0" label="得分类" />
            <a-option :value="1" label="测评类" />
          </a-select>
        </a-form-item>
        <a-form-item label="评分策略">
          <a-select v-model="appForm.scoringStrategy">
            <a-option :value="0" label="自定义" />
            <a-option :value="1" label="AI" />
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.add-form {
  max-width: 400px;
  width: 100%;
}
</style>
