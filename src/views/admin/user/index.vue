<script setup lang="ts">
import {
  listUserByPageUsingPost,
  deleteUserUsingPost,
  updateUserUsingPost
} from '@/api/userController'
import { Message } from '@arco-design/web-vue'
import { formatDate } from '@/utils'
import columns from './config'

const searchParams = ref<API.UserQueryRequest>({
  current: 1,
  pageSize: 10
})
const form = reactive({
  userName: ''
})
const tableData = ref<API.User[]>([])
const total = ref(0)
const fetchData = async () => {
  const res = await listUserByPageUsingPost(searchParams.value)
  if (!res.data) {
    Message.error('获取用户列表失败,' + res.message)
    return
  }
  tableData.value = res.data.records || []
  if (res.data.total) {
    total.value = parseInt(res.data.total)
  }
}
const handlePageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page
  }
}
// 删除用户
const handleDelete = async (id: string) => {
  const res = await deleteUserUsingPost({ id })
  if (res.code === 0) {
    Message.success('删除用户成功')
    await fetchData()
  } else {
    Message.error('删除用户失败,' + res.message)
  }
}
const initSearchParams = {
  current: 1,
  pageSize: 10
}
const handleSearch = () => {
  searchParams.value = {
    ...initSearchParams,
    userName: form.userName
  }
}
// 模态框逻辑
const visible = ref(false)
const editUserForm = ref<API.UserUpdateRequest>({
  id: '',
  userName: '',
  userRole: '',
  userAvatar: ''
})
const handleEdit = (user: API.User) => {
  visible.value = true
  editUserForm.value = {
    id: user.id,
    userName: user.userName,
    userRole: user.userRole,
    userAvatar: user.userAvatar
  }
}
const handleOk = async () => {
  const res = await updateUserUsingPost(editUserForm.value)
  if (res.code === 0) {
    Message.success('编辑用户成功')
    visible.value = false
    await fetchData()
  } else {
    Message.error('编辑用户失败,' + res.message)
  }
}
const handleCancel = () => {
  visible.value = false
}
// 获取数据
watchEffect(() => {
  fetchData()
})
</script>

<template>
  <div class="admin-user-container">
    <a-form :model="form" layout="inline" class="mb-3">
      <a-form-item label="用户名">
        <a-input v-model="form.userName" placeholder="请输入用户名" :style="{ width: '200px' }" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSearch">搜索</a-button>
      </a-form-item>
    </a-form>
    <common-table
      :data="tableData"
      :columns="columns"
      :pagination-props="{
        current: searchParams.current || 1,
        pageSize: searchParams.pageSize || 10,
        total
      }"
      @page-change="handlePageChange"
    >
      <template #userName="{ record }">{{ record.userName ?? '匿名用户' }}</template>
      <template #userRole="{ record }">
        <a-tag color="#00b42a">{{ record.userRole }}</a-tag>
      </template>
      <template #userAvatar="{ record }">
        <a-image :src="record.userAvatar" width="50" height="50" class="rounded-[50%]" />
      </template>
      <template #createTime="{ record }">{{ formatDate(record.createTime) }}</template>
      <template #operation="{ record }">
        <a-space>
          <a-button type="primary" size="mini" @click="handleEdit(record)">编辑</a-button>
          <a-popconfirm content="确认删除该用户？" position="bottom" @ok="handleDelete(record.id)">
            <a-button status="danger" size="mini">删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </common-table>
    <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
      <template #title>
        <h1 class="text-2xl font-bold text-gray-800">编辑用户信息</h1>
      </template>
      <div class="edit-user-form">
        <a-form :model="editUserForm">
          <a-form-item label="ID">
            <span>{{ editUserForm.id }}</span>
          </a-form-item>
          <a-form-item label="用户名">
            <a-input
              v-model="editUserForm.userName"
              placeholder="请输入用户名"
              :style="{ width: '200px' }"
            />
          </a-form-item>
          <a-form-item label="权限">
            <a-radio-group v-model="editUserForm.userRole">
              <a-radio value="admin">管理员</a-radio>
              <a-radio value="user">普通用户</a-radio>
              <a-radio value="ban">被封号</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="头像">
            <picture-upload
              biz="user_avatar"
              :value="editUserForm.userAvatar"
              :on-change="(url) => (editUserForm.userAvatar = url)"
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<style scoped lang="scss"></style>
