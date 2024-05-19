<script setup lang="ts">
import image from '@/assets/404.png'
</script>

<template>
  <div class="not-found-container">
    <a-empty
      description="The page you are looking for does not exist."
      :img-src="image"
    />
  </div>
</template>

<style scoped lang="scss">
@import '~@/styles/common.scss';

.not-found-container {
  @include layout-container;
  @include flex-center;
}
:deep(.arco-empty-image) {
  display: flex;
  justify-content: center;
  img {
    width: 200px;
    height: auto;
  }
}
</style>
