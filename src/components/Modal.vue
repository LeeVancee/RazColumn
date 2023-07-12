<template>
  <!-- <n-button @click="showModal = true"> 来吧 </n-button> -->
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    :title="title"
    :content="content"
    positive-text="确认"
    negative-text="取消"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  title: String,
  visible: {
    type: Boolean,
    default: false
  },
  content: String
})

const showModalRef = ref(false)

const showModal = showModalRef

if (props.visible === true) {
  showModalRef.value = true
}
console.log(showModal)
const onNegativeClick = () => {
  showModalRef.value = false
}
const onPositiveClick = () => {
  emit('modal-on-confirm')
  showModalRef.value = false
}

const emit = defineEmits(['modal-on-confirm'])
</script>
