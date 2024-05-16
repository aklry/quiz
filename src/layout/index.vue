<script setup lang="ts">
import Header from './components/header.vue';
</script>

<template>
  <div class="layout-container">
    <a-layout>
      <a-layout-header class="header box-border">
        <Header />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer text-center">
        <a-link href="http://doc.aklry.com" :hoverable="false" target="_blank">Copyright © 2024 aklry</a-link>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped lang="scss">
@import '~@/styles/common.scss';

.layout-container {
  @include layout-container;
}

.arco-layout {
  @include layout-container;
}

.header {
  @include layout;
}

.content {
  padding: 24px;
}

.footer {
  @include layout;
}
</style>
