<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <n-button type="info"> 提交 </n-button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
export const emitter = mitt()
</script>
<script setup lang="ts">
import { onUnmounted } from 'vue'
import mitt from 'mitt'
type ValidateFunc = () => boolean
const emit = defineEmits(['form-submit'])
let funcArr: ValidateFunc[] = []
const submitForm = () => {
  const result = funcArr.map((func) => func()).every((result) => result)
  emit('form-submit', result)
}
const callback = (func?: ValidateFunc) => {
  if (func) {
    funcArr.push(func)
  }
}
emitter.on('form-item-created', callback)
onUnmounted(() => {
  emitter.off('form-item-created', callback)
  funcArr = []
})
</script>
