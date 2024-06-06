<script setup lang="ts">
import { getAppVoByIdUsingGet } from '@/api/appController'
import { listQuestionVoByPageUsingPost } from '@/api/questionController'
import { addUserAnswerUsingPost } from '@/api/userAnswerController'
import { Message } from '@arco-design/web-vue'
import type { RadioOption } from '@arco-design/web-vue/es/radio/interface'

const router = useRouter()
const app = ref<API.AppVO>({})
const props = withDefaults(defineProps<{ appId: string }>(), { appId: '' })
const questionContent = ref<API.QuestionContentDto[]>([])
const fetchData = async () => {
  let res: API.BaseResponseAppVO_ | API.BaseResponsePageQuestionVO_
  try {
    res = await getAppVoByIdUsingGet({
      id: props.appId
    })
    if (res.code === 0 && res.data) {
      app.value = res.data
    } else {
      Message.error('获取应用信息失败')
    }
    res = await listQuestionVoByPageUsingPost({
      appId: props.appId,
      current: 1,
      pageSize: 1,
      sortField: 'createTime',
      sortOrder: 'descend'
    })
    if (res.code === 0 && res.data && res.data.records && res.data.records.length > 0) {
      questionContent.value = res.data.records[0].questionContent as API.QuestionContentDto[]
    } else {
      Message.error('获取题目信息失败')
    }
  } catch (error) {
    console.error(error)
  }
}

// 当前题号
const currentQuestionIndex = ref(0)
// 当前题目
const currentQuestion = ref<API.QuestionContentDto>({})
// 当前题目答案
const currentAnswer = ref('')

// 当前题目选项
const questionOptions = computed(() => {
  if (!currentQuestion.value) {
    return [] as RadioOption[]
  } else {
    if (currentQuestion.value.options) {
      const options = currentQuestion.value.options.map((option) => {
        return {
          label: `${option.key}. ${option.value}`,
          value: option.key
        }
      }) as RadioOption[]
      return options
    } else {
      return [] as RadioOption[]
    }
  }
})

// 最终结果
const finalResult = ref<string[]>([])

// 选项变化
const handleRadioChange = (value: string | number | boolean) => {
  finalResult.value[currentQuestionIndex.value] = value.toString()
}
// 提交答案
const doSubmit = async () => {
  const res = await addUserAnswerUsingPost({
    appId: props.appId,
    choices: finalResult.value
  })
  if (res.code === 0) {
    Message.success('提交成功')
    router.push({ name: 'AnswerResult', params: { id: res.data } })
  } else {
    Message.error('提交失败')
  }
}
watchPostEffect(() => {
  currentAnswer.value = finalResult.value[currentQuestionIndex.value]
  currentQuestion.value = questionContent.value[currentQuestionIndex.value]
})
onMounted(() => {
  fetchData()
})
</script>
<template>
  <div class="do-answer-container">
    <h1 class="font-bold text-lg">{{ currentQuestion?.title }}</h1>
    <a-radio-group
      v-model="currentAnswer"
      :options="questionOptions"
      direction="vertical"
      @change="handleRadioChange"
    />
    <div class="mt-4">
      <a-space>
        <a-button
          size="small"
          type="primary"
          :disabled="currentQuestionIndex === 0"
          @click="currentQuestionIndex--"
        >
          上一题
        </a-button>
        <a-button
          size="small"
          type="primary"
          :disabled="currentQuestionIndex === questionContent.length - 1 || currentAnswer === ''"
          @click="currentQuestionIndex++"
        >
          下一题
        </a-button>
        <a-button
          size="small"
          type="primary"
          status="danger"
          :disabled="currentQuestionIndex !== questionContent.length - 1"
          @click="doSubmit"
        >
          查看结果
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
