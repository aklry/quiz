<script setup lang="ts"></script>

<template>
  <div class="user-layout-container">
    <a-layout>
      <a-layout-header class="header box-border">
        <a-space>
          <a-avatar :size="50" image-url="/logo.png" />
          <span class="text-base tracking-widest">Quiz智能AI答题平台</span>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer text-center">
        <a-link href="http://doc.aklry.com" :hoverable="false" target="_blank"
          >Copyright © 2024 aklry
        </a-link>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped lang="scss">
@import '~@/styles/common.scss';

.user-layout-container {
  @include layout-container;
  background: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg') no-repeat
    center center;
}

.arco-layout {
  @include layout-container;
}

.header {
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: center;
}

.content {
  flex: 1;
  padding: 24px;
}

.footer {
  @include layout;
}
</style>
