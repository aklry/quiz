<script setup lang="ts">
import { getAppVoByIdUsingGet } from '@/api/appController'
import { formatDate } from '@/utils'
import { useUserStore } from '@/stores/modules/user/user'
import { APP_TYPE, SCORING_STRATEGY } from '../../constants'

const props = withDefaults(defineProps<{ appId: string }>(), {
  appId: ''
})
const detail = ref<API.AppVO>({})
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
onMounted(async () => {
  const result = await getAppVoByIdUsingGet({
    id: Number(props.appId)
  })
  if (result.code === 0 && result.data) {
    detail.value = result.data
  }
})
const isMyApp = computed(() => user.value && detail.value && user.value.id === detail.value.userId)
</script>

<template>
  <div class="app-detail-container">
    <a-card>
      <a-row class="items-center">
        <a-col flex="auto" class="leading-8">
          <h2 class="font-bold text-xl">{{ detail.appName }}</h2>
          <p class="mb-3 mt-1.5">{{ detail.appDesc }}</p>
          <p class="mb-3">
            应用类型:{{ detail.appType !== undefined && APP_TYPE.APP_TYPE_MAP[detail.appType] }}
          </p>
          <p class="mb-3">
            评分策略:{{
              detail.scoringStrategy !== undefined &&
              SCORING_STRATEGY.APP_SCORING_STRATEGY_MAP[detail.scoringStrategy]
            }}
          </p>
          <p class="mb-3">
            <a-space size="mini">
              <span>作者:</span>
              <a-avatar :image-url="detail.user?.userAvatar" :size="20" />
              <span>{{ detail.user?.userName }}</span>
            </a-space>
          </p>
          <p class="mb-3">创建时间:{{ formatDate(detail.createTime as string) }}</p>
          <a-space>
            <a-button type="primary">开始答题</a-button>
            <a-button>分享应用</a-button>
            <a-button v-if="isMyApp">设置题目</a-button>
            <a-button v-if="isMyApp">设置评分</a-button>
            <a-button v-if="isMyApp">修改应用</a-button>
          </a-space>
        </a-col>
        <a-col flex="300px">
          <a-image :src="detail.appIcon" />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<style scoped lang="scss"></style>
