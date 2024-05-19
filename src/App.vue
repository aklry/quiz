<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user/user'

const userStore = useUserStore()
userStore.fetchLoginUser()
</script>

<template>
  <div class="app-container">
    <RouterView />
  </div>
</template>

<style scoped></style>
