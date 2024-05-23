<script setup lang="ts">
import { listUserByPageUsingPost, deleteUserUsingPost } from '@/api/userController'
import { Message } from '@arco-design/web-vue'
import { formatDate } from '@/utils'

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
const handleDelete = async (id: number) => {
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
    <a-table
      :data="tableData"
      :pagination="{
        current: searchParams.current || 1,
        pageSize: searchParams.pageSize || 10,
        total,
        showTotal: true
      }"
      @page-change="handlePageChange"
    >
      <template #columns>
        <a-table-column title="id" data-index="id" :width="200" />
        <a-table-column title="账号" data-index="userAccount" />
        <a-table-column title="用户名">
          <template #cell="{ record }">{{ record.userName ?? '匿名用户' }}</template>
        </a-table-column>
        <a-table-column title="权限">
          <template #cell="{ record }">
            <a-tag color="#00b42a">{{ record.userRole }}</a-tag>
          </template>
        </a-table-column>
        <a-table-column title="头像">
          <template #cell="{ record }">
            <a-image :src="record.userAvatar" width="50" />
          </template>
        </a-table-column>
        <a-table-column title="创建时间">
          <template #cell="{ record }">{{ formatDate(record.createTime) }}</template>
        </a-table-column>
        <a-table-column title="操作" :width="150">
          <template #cell="{ record }">
            <a-button class="mr-1.5" type="primary" size="mini">编辑</a-button>
            <a-button status="danger" size="mini" @click="handleDelete(record.id)">删除</a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>

<style scoped lang="scss"></style>
