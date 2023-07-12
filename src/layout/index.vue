<template>
  <div class="layout">
    <Header :data="currentUser" :is-login="isLogin"></Header>
    <loader v-if="isLoading"></loader>
    <Main />
    <div class="box"></div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header/index.vue'
import Main from './components/Main/index.vue'
import Footer from './components/Footer/index.vue'
import Loader from '@/components/Loader.vue'
import { computed, watch } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useGlobalStore } from '@/stores/global'
import { useUserStore } from '@/stores/user'

const globalStore = useGlobalStore()
const userStore = useUserStore()
const currentUser = computed(() => userStore.data)
const isLogin = computed(() => userStore.isLogin)
const isLoading = computed(() => globalStore.loading)
const error = computed(() => globalStore.error)
watch(
  () => error.value.status,
  () => {
    const { status, message } = error.value
    if (status && message) {
      //createMessage(message, 'error', 2000)
      window.$message.success(message, {
        duration: 2000
      })
    }
  }
)
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  align-content: space-between;
}
.box {
  opacity: 0;
  width: 100%;
  height: 100%;
}
</style>
