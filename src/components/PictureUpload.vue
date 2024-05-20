<script setup lang="ts">
import { Message, type RequestOption } from '@arco-design/web-vue'
import type { IPictureUploadProps } from './type'
import { uploadFileUsingPost } from '@/api/fileController'

const file = ref()
const props = withDefaults(defineProps<IPictureUploadProps>(), {
  value: () => ''
})
if (props.value) {
  file.value = {
    url: props.value,
    percent: 100,
    status: 'done'
  }
}
const handleUpload = async (option: RequestOption) => {
  const { onSuccess, fileItem } = option
  const res = await uploadFileUsingPost(
    {
      biz: props.biz
    },
    {},
    fileItem.file
  )
  if (res.code === 0 && res.data) {
    file.value = {
      url: res.data,
      name: fileItem.name,
      file: fileItem.file
    }
    props.onChange?.(res.data)
    onSuccess()
  } else {
    Message.error('上传失败' + res.message || '')
  }
}
</script>

<template>
  <a-space direction="vertical" :style="{ width: '100%' }">
    <a-upload
      :fileList="file ? [file] : []"
      :show-file-list="false"
      :custom-request="handleUpload"
    >
      <template #upload-button>
        <div
          :class="`arco-upload-list-item${
            file && file.status === 'error' ? ' arco-upload-list-item-error' : ''
          }`"
        >
          <div class="arco-upload-list-picture custom-upload-avatar" v-if="file && file.url">
            <img :src="file.url" />
            <div class="arco-upload-list-picture-mask">
              <IconEdit />
            </div>
            <a-progress
              v-if="file.status === 'uploading' && file.percent < 100"
              :percent="file.percent"
              type="circle"
              size="mini"
              :style="{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translateX(-50%) translateY(-50%)'
              }"
            />
          </div>
          <div class="arco-upload-picture-card" v-else>
            <div class="arco-upload-picture-card-text">
              <IconPlus />
              <div style="margin-top: 10px; font-weight: 600">Upload</div>
            </div>
          </div>
        </div>
      </template>
    </a-upload>
  </a-space>
</template>

<style scoped lang="scss"></style>
