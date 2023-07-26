<template>
  <n-modal v-model:show="showModal">
    <div>
      <component :is="pwdStore.validate == 1 ? Login : Signup" />
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import { usePwdStore } from '@/stores/pwd'

const pwdStore = usePwdStore()

const showModal = ref(false)
</script>
