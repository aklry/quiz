<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user/user'
import { Message } from '@arco-design/web-vue'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const loginForm = reactive<API.UserLoginRequest>({
  userAccount: '',
  userPassword: ''
})
const handleLogin = async () => {
  try {
    await userStore.login(loginForm)
    Message.success('登录成功')
    const redirect = route.query.redirect as string
    if (route.query.redirect) {
      await router.replace({
        path: redirect
      })
    } else {
      await router.replace({ name: 'Home' })
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="login-container flex justify-center items-center flex-col">
    <div class="login-title flex justify-center mb-4">
      <h1 class="text-xl font-bold">登录</h1>
    </div>
    <div class="login-form">
      <a-form :model="loginForm" @submit="handleLogin">
        <a-form-item label="账户">
          <a-input v-model="loginForm.userAccount" />
        </a-form-item>
        <a-form-item label="密码">
          <a-input-password v-model="loginForm.userPassword" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-form {
  width: 480px;
}
</style>
