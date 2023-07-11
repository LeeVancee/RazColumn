<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { createDiscreteApi } from 'naive-ui'

const { message, notification, dialog, loadingBar } = createDiscreteApi([
  'message',
  'dialog',
  'notification',
  'loadingBar'
])

window.$message = message
window.$notification = notification
window.$dialog = dialog
window.$loadingBar = loadingBar
</script>
