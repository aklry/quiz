<script setup lang="ts">
import type { IAppCardProps } from './type'

const props = withDefaults(defineProps<IAppCardProps>(), {
  app: () => ({})
})
const router = useRouter()
const toDetail = () => {
  router.push({ path: `/app/detail/${props.app.id}` })
}
</script>

<template>
  <div class="app-card-container cursor-pointer">
    <a-card size="small" @click="toDetail">
      <template #actions>
        <span class="icon-hover"> <IconThumbUp /> </span>
        <span class="icon-hover"> <IconShareInternal /> </span>
      </template>
      <template #cover>
        <div
          :style="{
            height: '204px',
            overflow: 'hidden'
          }"
        >
          <img :style="{ width: '100%', height: '100%' }" :src="app.appIcon" />
        </div>
      </template>
      <a-card-meta :title="app.appName" :description="app.appDesc">
        <template #avatar>
          <div :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
            <a-avatar
              :size="24"
              :style="{ marginRight: '8px' }"
              :image-url="app.user?.userAvatar"
            />
            <a-typography-text>{{ app.user?.userName ?? '佚名' }}</a-typography-text>
          </div>
        </template>
      </a-card-meta>
    </a-card>
  </div>
</template>

<style scoped lang="scss">
.app-card-container {
  width: 300px;
}
</style>
