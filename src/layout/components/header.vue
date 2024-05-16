<script setup lang="ts">
import Menu from './menu.vue'
</script>

<template>
  <header class="header">
    <div class="header__logo p-2 box-border">
      <a-image src="/logo.png" fit="contain" height="48" width="64" />
      <span class="text-blue-300 ml-2">QuizUI</span>
    </div>
    <nav class="header__nav flex-grow">
      <Menu />
    </nav>
    <div class="header__infos">
      <a-dropdown trigger="hover" :popup-max-height="false">
        <a-button
          >个人信息
          <icon-down />
        </a-button>
        <template #content>
          <a-doption>退出登录</a-doption>
        </template>
      </a-dropdown>
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
  margin-top: 20px;
}

.header__nav {
  margin-left: 20px;
}

.header__infos {
  width: 100px;
}
</style>
