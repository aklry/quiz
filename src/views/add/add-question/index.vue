<script setup lang="ts">
import {
  listQuestionVoByPageUsingPost,
  addQuestionUsingPost,
  updateQuestionUsingPost
} from '@/api/questionController'
import { Message } from '@arco-design/web-vue'
import Drawer from '../components/drawer.vue'

const props = withDefaults(defineProps<{ appId: string }>(), {
  appId: ''
})
const router = useRouter()
const oldQuestionContent = ref<API.QuestionVO>()
const questionContent = ref<API.QuestionContentDto[]>([])
// 添加题目
const handleAddQuestion = (index: number) => {
  questionContent.value.splice(index, 0, {
    title: '',
    options: []
  })
}
// 删除题目
const handleDeleteQuestion = (index: number) => {
  questionContent.value.splice(index, 1)
}
// 添加题目选项
const handleAddQuestionOption = (question: API.QuestionContentDto, index: number) => {
  if (!question.options) {
    question.options = []
  }
  question.options.splice(index, 0, {
    key: '',
    value: ''
  })
}
// 删除题目选项
const handleDeleteQuestionOption = (question: API.QuestionContentDto, index: number) => {
  if (!question.options) {
    return
  }
  question.options.splice(index, 1)
}
// 提交表单
const handleSubmit = async () => {
  let res: API.BaseResponseLong_ | API.BaseResponseBoolean_ | null = null
  if (!props.appId) {
    return
  } else if (!oldQuestionContent.value) {
    res = await addQuestionUsingPost({
      appId: props.appId,
      questionContent: questionContent.value
    })
  } else {
    if (oldQuestionContent.value.id) {
      res = await updateQuestionUsingPost({
        id: oldQuestionContent.value.id,
        questionContent: questionContent.value
      })
    }
  }
  if (res?.code === 0) {
    Message.success('操作成功, 即将跳转到应用详情页')
    setTimeout(() => {
      router.push({ name: 'AppDetail', params: { appId: props.appId } })
    }, 3000)
  } else {
    Message.error('操作失败')
  }
}
onMounted(async () => {
  if (!props.appId) return
  const res = await listQuestionVoByPageUsingPost({
    current: 1,
    appId: props.appId,
    pageSize: 10,
    sortField: 'createTime',
    sortOrder: 'descend'
  })
  if (res.data && res.data.records && res.data.records.length > 0) {
    oldQuestionContent.value = res.data.records[0]
  }
  if (oldQuestionContent.value) {
    questionContent.value = oldQuestionContent.value.questionContent ?? []
  }
})
</script>

<template>
  <div class="add-question-container">
    <h2 class="font-bold text-lg">设置题目</h2>
    <a-form :model="questionContent" auto-label-width @submit="handleSubmit">
      <a-form-item label="应用ID">{{ appId }}</a-form-item>
      <a-form-item label="题目列表" :content-flex="false" :merge-props="false">
        <a-space>
          <a-button @click="handleAddQuestion(questionContent.length)">底部添加题目</a-button>
          <drawer :app-id="appId" @set-question-content="questionContent = $event" />
        </a-space>
        <div v-for="(item, index) in questionContent" :key="index">
          <a-space size="large" class="mt-2">
            <h3 class="font-bold text-lg">题目{{ index + 1 }}</h3>
            <a-button class="mr-2" size="mini" type="primary" @click="handleAddQuestion(index + 1)"
              >添加题目
            </a-button>
            <a-button size="mini" status="danger" @click="handleDeleteQuestion(index)"
              >删除题目
            </a-button>
          </a-space>
          <a-form-item :label="`题目${index + 1}标题`" class="mt-2">
            <a-input style="width: 300px" v-model="item.title" placeholder="请输入标题" />
          </a-form-item>
          <a-space size="large" class="mt-2">
            <h4>题目{{ index + 1 }}选项列表</h4>
            <a-button
              class="mr-2"
              size="mini"
              type="primary"
              @click="handleAddQuestionOption(item, item.options?.length ?? 1)"
            >
              底部添加选项
            </a-button>
          </a-space>
          <a-form-item
            v-for="(option, optionIndex) in item.options"
            :label="`选项${optionIndex + 1}`"
            :key="optionIndex"
            class="mt-2"
            :content-flex="false"
            :merge-props="false"
          >
            <a-form-item label="选项 key">
              <a-input style="width: 300px" v-model="option.key" placeholder="请输入选项key" />
            </a-form-item>
            <a-form-item label="选项 value">
              <a-input style="width: 300px" v-model="option.value" placeholder="请输入选项value" />
            </a-form-item>
            <a-form-item label="选项 结果">
              <a-input style="width: 300px" v-model="option.result" placeholder="请输入选项结果" />
            </a-form-item>
            <a-form-item label="选项 得分">
              <a-input-number
                style="width: 300px"
                v-model="option.score"
                placeholder="请输入选项得分"
              />
            </a-form-item>
            <a-space>
              <a-button
                class="mr-2"
                size="mini"
                type="primary"
                @click="handleAddQuestionOption(item, optionIndex + 1)"
                >添加选项
              </a-button>
              <a-button
                size="mini"
                status="danger"
                @click="handleDeleteQuestionOption(item, optionIndex)"
                >删除选项
              </a-button>
            </a-space>
          </a-form-item>
        </div>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="scss"></style>
