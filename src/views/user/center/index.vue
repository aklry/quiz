<script setup lang="ts">
import { getUserVoByIdUsingGet, updateMyUserUsingPost } from '@/api/userController'
import { Message } from '@arco-design/web-vue'

const props = withDefaults(defineProps<{ userId: string }>(), {
  userId: ''
})
const editUserForm = ref<API.UserUpdateMyRequest>({
  userName: '',
  userAvatar: '',
  userProfile: '',
  userPassword: ''
})
const router = useRouter()
onMounted(async () => {
  const res = await getUserVoByIdUsingGet({
    id: props.userId as string
  })
  if (res.code === 0) {
    const { data: user } = res
    editUserForm.value = {
      userName: user?.userName,
      userAvatar: user?.userAvatar,
      userProfile: user?.userProfile
    }
  }
})
const handleEditUser = async () => {
  const res = await updateMyUserUsingPost(editUserForm.value)
  if (res.code === 0) {
    Message.success('修改成功')
    router.push({ name: 'Login' })
  } else {
    Message.error('修改失败,' + res.message)
  }
}
</script>

<template>
  <div class="user-center-container p-[20px]">
    <h1 class="text-2xl font-bold text-gray-800 mb-[20px]">个人中心</h1>
    <a-form :model="editUserForm">
      <a-form-item label="用户ID">
        <span>{{ userId }}</span>
      </a-form-item>
      <a-form-item label="用户名">
        <a-input v-model="editUserForm.userName" placeholder="请输入用户名" style="width: 250px" />
      </a-form-item>
      <a-form-item label="新密码">
        <a-input-password
          v-model="editUserForm.userPassword"
          placeholder="请输入密码"
          style="width: 250px"
        />
      </a-form-item>
      <a-form-item label="用户头像">
        <picture-upload
          biz="user_avatar"
          :value="editUserForm.userAvatar"
          :on-change="(url) => (editUserForm.userAvatar = url)"
        />
      </a-form-item>
      <a-form-item label="用户简介">
        <a-textarea
          v-model="editUserForm.userProfile"
          placeholder="请输入用户简介"
          allow-clear
          style="width: 250px"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleEditUser">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped lang="scss"></style>
