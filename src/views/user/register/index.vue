<script setup lang="ts">
import { userRegisterUsingPost } from '@/api/userController'
import { Message } from '@arco-design/web-vue'

const router = useRouter()
const registerForm = reactive<API.UserRegisterRequest>({
  userAccount: '',
  userPassword: '',
  checkPassword: ''
})
const handleRegister = async () => {
  try {
    const res = await userRegisterUsingPost(registerForm)
    if (res.code === 0) {
      Message.success('注册成功')
      await router.push('/user/login')
    } else {
      Message.error('注册失败, ' + res.message)
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="login-container flex justify-center items-center flex-col">
    <div class="login-title flex justify-center mb-4">
      <h1 class="text-xl font-bold">注册</h1>
    </div>
    <div class="login-form">
      <a-form :model="registerForm" @submit="handleRegister">
        <a-form-item label="账户">
          <a-input v-model="registerForm.userAccount" />
        </a-form-item>
        <a-form-item label="密码">
          <a-input-password v-model="registerForm.userPassword" />
        </a-form-item>
        <a-form-item label="确认密码">
          <a-input-password v-model="registerForm.checkPassword" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">注册</a-button>
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
