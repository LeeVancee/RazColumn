<template>
  <teleport to="#modal">
    <div class="modal d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" @click="onClose">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="onClose">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="onConfirm">确定</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import useDOMCreate from '../hooks/useDOMCreate'

const emit = defineEmits(['modal-on-close', 'modal-on-confirm'])
const props = defineProps({
  title: String,
  visible: {
    type: Boolean,
    default: false
  }
})
const onClose = () => {
  emit('modal-on-close')
}
const onConfirm = () => {
  emit('modal-on-confirm')
}
useDOMCreate('modal')
</script>
