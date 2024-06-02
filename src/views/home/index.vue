<script setup lang="ts">
import AppCard from '@/components/AppCard.vue'
import { listAppVoByPageUsingPost } from '@/api/appController'

const dataSource = ref<API.AppVO[]>([])
const initPaginationProps = {
  current: 1,
  pageSize: 6
}
const paginationProps = ref<API.AppQueryRequest>({
  ...initPaginationProps
})
const total = ref(0)
const fetchAppData = async () => {
  const res = await listAppVoByPageUsingPost(paginationProps.value)
  if (res.code === 0) {
    if (res.data?.records) {
      dataSource.value = res.data.records || []
    }
    if (res.data?.total) {
      total.value = parseInt(res.data.total) || 0
    }
  }
}
const handleSearch = (value: string) => {
  paginationProps.value = {
    ...initPaginationProps,
    appName: value
  }
}
const handlePageChange = (current: number) => {
  paginationProps.value = {
    ...initPaginationProps,
    current
  }
}
watchEffect(() => {
  fetchAppData()
})
</script>

<template>
  <div class="home-container">
    <div class="search-bar mb-4 text-center">
      <a-input-search
        :style="{ width: '320px' }"
        placeholder="快速搜索应用"
        button-text="Search"
        search-button
        @search="handleSearch"
      />
    </div>
    <div class="content">
      <a-list
        :grid-props="{ gutter: [30, 30], sm: 24, md: 12, lg: 8, xl: 6 }"
        :bordered="false"
        :data="dataSource"
        :pagination-props="{
          total,
          pageSize: paginationProps.pageSize,
          current: paginationProps.current
        }"
        @page-change="handlePageChange"
      >
        <template #item="{ item }">
          <app-card :app="item" />
        </template>
      </a-list>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
