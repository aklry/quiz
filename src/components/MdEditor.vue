<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'

const value = ref('')
const plugins = [gfm(), highlight()]
const handleChange = (v: string) => {
  value.value = v
}
</script>

<template>
  <div class="editor-container">
    <Editor :value="value" :plugins="plugins" @change="handleChange" />
  </div>
</template>

<style scoped lang="scss"></style>
