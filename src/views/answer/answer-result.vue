<script setup lang="ts">
import { getUserAnswerVoByIdUsingGet } from '@/api/userAnswerController'
import { APP_TYPE, SCORING_STRATEGY } from '@/constants'
import { formatDate } from '@/utils'

const props = withDefaults(defineProps<{ id: string }>(), { id: '' })
const answer = ref<API.UserAnswerVO>()

onMounted(async () => {
  const res = await getUserAnswerVoByIdUsingGet({
    id: props.id
  })
  if (res.code === 0) {
    answer.value = res.data
  }
})
</script>
<template>
  <div class="answer-result-container">
    <a-card>
      <a-row class="items-center">
        <a-col flex="auto" class="leading-8 text-base">
          <h2 class="font-bold text-xl">{{ answer?.resultName }}</h2>
          <p class="mb-3 mt-1.5">
            <span class="font-bold">结果描述: </span>{{ answer?.resultDesc }}
          </p>
          <p class="mb-3 mt-1.5"><span class="font-bold">结果id: </span>{{ answer?.id }}</p>
          <p class="mb-3 mt-1.5" v-if="answer?.resultScore">
            <span class="font-bold">结果得分: </span>{{ answer?.resultScore }}
          </p>
          <p class="mb-3 mt-1.5"><span class="font-bold">我的答案: </span>{{ answer?.choices }}</p>
          <p class="mb-3 mt-1.5"><span class="font-bold">应用id: </span>{{ answer?.appId }}</p>
          <p class="mb-3">
            <span class="font-bold">应用类型: </span
            >{{ answer?.appType !== undefined && APP_TYPE.APP_TYPE_MAP[answer.appType] }}
          </p>
          <p class="mb-3">
            <span class="font-bold">评分策略: </span
            >{{
              answer?.scoringStrategy !== undefined &&
              SCORING_STRATEGY.APP_SCORING_STRATEGY_MAP[answer.scoringStrategy]
            }}
          </p>
          <p class="mb-3">
            <a-space size="mini">
              <span class="font-bold">作者: </span>
              <a-avatar :image-url="answer?.user?.userAvatar" :size="20" />
              <span>{{ answer?.user?.userName }}</span>
            </a-space>
          </p>
          <p class="mb-3">
            <span class="font-bold">答题时间: </span>{{ formatDate(answer?.createTime as string) }}
          </p>
          <p class="mt-1.5">
            <a-button type="outline" class="ml-2" @click="$router.replace('/')">回主页</a-button>
            <a-button type="outline" class="ml-2" :href="`/answer/doAnswer/${answer?.appId}`"
              >重新答题</a-button
            >
          </p>
        </a-col>
        <a-col flex="300px">
          <a-image :src="answer?.resultPicture" />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<style scoped lang="less"></style>
