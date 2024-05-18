<script setup lang="ts">
import { userLoginUsingPost } from '@/api/userController'
onMounted(async () => {
  const res = await userLoginUsingPost({
    userAccount: 'yupi',
    userPassword: '12345678'
  })
  console.log(res)
})
</script>

<template>
  <div class="home">
    <h1>Welcome to Home Page</h1>
  </div>
</template>

<style scoped lang="scss"></style>
