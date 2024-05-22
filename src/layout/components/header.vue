<script setup lang="ts">
import Menu from './menu.vue'
import { useUserStore } from '@/stores/modules/user/user'

const userStore = useUserStore()
const router = useRouter()

const handleLogin = () => {
  router.push({ name: 'Login' })
}
const handleLogout = () => {
  userStore.logout()
}
</script>

<template>
  <header class="header">
    <div class="header__logo p-2 box-border">
      <a-image src="/logo.png" fit="contain" height="48" width="64" />
      <span class="text-blue-300 ml-2">Quiz</span>
    </div>
    <nav class="header__nav flex-grow">
      <Menu />
    </nav>
    <div class="header__infos">
      <template v-if="userStore.user">
        <a-dropdown trigger="hover" :popup-max-height="false">
          <a-button
            >{{ userStore.user?.userName ?? '匿名用户' }}
            <icon-down />
          </a-button>
          <template #content>
            <a-doption @click="handleLogout">退出登录</a-doption>
          </template>
        </a-dropdown>
      </template>
      <template v-else>
        <a-button type="primary" size="mini" @click="handleLogin">登录</a-button>
      </template>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
}

.header__logo {
  display: flex;
  align-items: center;
  height: 64px;
}

.header__nav {
  margin-left: 20px;
}

:deep(.header__infos) {
  width: 100px;
  text-align: center;
}
</style>
