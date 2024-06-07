<script setup lang="ts">
import type { ICommonTableProps } from './type'

withDefaults(defineProps<ICommonTableProps>(), {
  data: () => [],
  columns: () => [],
  paginationProps: () => ({
    current: 1,
    pageSize: 10,
    total: 0
  })
})
const emits = defineEmits(['pageChange'])
const onChange = (current: number) => {
  emits('pageChange', current)
}
</script>
<template>
  <div class="commonTable-container">
    <a-table :data="data" :pagination="paginationProps" @page-change="onChange">
      <template #columns>
        <template v-for="(item, index) in columns" :key="index">
          <template v-if="item.slotName">
            <a-table-column :title="item.title as string">
              <template #cell="{ record }">
                <slot :name="item.slotName" :record="record" />
              </template>
            </a-table-column>
          </template>
          <template v-else>
            <a-table-column
              :title="item.title as string"
              :data-index="item.dataIndex"
              :ellipsis="true"
              :tooltip="true"
            />
          </template>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped lang="scss"></style>
