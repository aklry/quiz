<script setup lang="ts">
import { useSettingStore } from '@/stores/modules/setting/setting'
import { useUserStore } from '@/stores/modules/user/user'
import { checkAuth } from '@/permission/checkPermission'

const router = useRouter()
const settingStore = useSettingStore()
const userStore = useUserStore()
const allRoutes = router.options.routes[0].children
const loginUser = userStore.user as API.LoginUserVO
const { selectedMenu } = storeToRefs(settingStore)
const menuRoutes = computed(() => {
  return allRoutes?.filter((route) => {
    console.log(checkAuth(loginUser, route.meta?.auth as string))
    if (!checkAuth(loginUser, route.meta?.auth as string)) {
      return false
    }
    return route.meta?.isMenu
  })
})

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
