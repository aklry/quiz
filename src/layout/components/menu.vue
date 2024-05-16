<script setup lang="ts">
import { useSettingStore } from '@/stores/modules/setting/setting'

const router = useRouter()
const settingStore = useSettingStore()
const { selectedMenu } = storeToRefs(settingStore)
const allRoutes = router.options.routes[0].children
const menuRoutes = allRoutes?.filter((route) => route.meta?.isMenu)

const handleMenuClick = (key: string) => {
  router.push({
    path: key
  })
  settingStore.setSelectedMenu([key])
}
</script>

<template>
  <div class="menu-container">
    <a-menu
      mode="horizontal"
      :default-selected-keys="selectedMenu"
      @menu-item-click="handleMenuClick"
    >
      <a-menu-item v-for="route in menuRoutes" :key="route.path">
        {{ route.meta?.title }}
      </a-menu-item>
    </a-menu>
  </div>
</template>

<style scoped lang="scss"></style>
