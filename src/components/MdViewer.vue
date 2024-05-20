<script setup lang="ts">
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'

interface IProps {
  value: string
}

const plugins = [gfm(), highlight()]
const props = withDefaults(defineProps<IProps>(), {
  value: () => ''
})
</script>

<template>
  <div class="md-viewer-container">
    <Viewer :value="value" :plugins="plugins" />
  </div>
</template>

<style scoped lang="scss"></style>
