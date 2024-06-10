<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import type { IDrawerProps } from './type'
import { aiGenerateQuestion } from '@/api/questionController'

const props = withDefaults(defineProps<IDrawerProps>(), {
  appId: ''
})
const emits = defineEmits(['setQuestionContent'])

const visible = ref(false)
const loading = ref(false)
const form = ref<API.AIGenerateQuestionRequest>({
  questionNumber: 1,
  optionNumber: 2
})

const handleClick = () => {
  visible.value = true
}
const handleOk = () => {
  visible.value = false
}
const handleCancel = () => {
  visible.value = false
}
// 发送请求生成题目
const handleGenerateQuestion = async () => {
  if (!props.appId) return
  loading.value = true
  const res = await aiGenerateQuestion({
    ...form.value,
    appId: props.appId
  })
  if (res.code === 0) {
    Message.success('题目生成成功')
    loading.value = false
    visible.value = false
    emits('setQuestionContent', res.data)
  } else {
    Message.error('题目生成失败,' + res.message)
    loading.value = false
  }
}
</script>
<template>
  <div class="drawer-container">
    <a-button type="outline" @click="handleClick" size="small">AI 生成题目</a-button>
    <a-drawer
      :width="340"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      unmountOnClose
      :footer="false"
    >
      <template #title>
        <h1 class="font-bold text-2xl">AI 生成题目</h1>
      </template>
      <div class="drawer-form">
        <a-form :model="form" autoLabelWidth>
          <a-form-item label="应用id">{{ props.appId }}</a-form-item>
          <a-form-item label="题目数量">
            <a-input-number v-model="form.questionNumber" placeholder="请输入题目数量" :min="1" />
          </a-form-item>
          <a-form-item label="选项数量">
            <a-input-number v-model="form.optionNumber" placeholder="请输入选项数量" :min="2" />
          </a-form-item>
          <a-form-item>
            <a-button
              :loading="loading"
              html-type="submit"
              type="primary"
              class="w-full"
              @click="handleGenerateQuestion"
              >{{ loading ? '生成中...' : '一键生成' }}</a-button
            >
          </a-form-item>
        </a-form>
      </div>
    </a-drawer>
  </div>
</template>

<style scoped lang="scss"></style>
