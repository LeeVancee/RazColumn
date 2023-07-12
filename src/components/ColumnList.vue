<template>
  <div class="row">
    <div v-for="column in columnList" :key="column._id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar && column.avatar.fitUrl"
            :alt="column.title"
            class="rounded-circle border border-light my-3"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>

          <n-button @click="toColumn(column._id)"> 进入专栏 </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType, computed } from 'vue'
import { addColumnAvatar } from '../helper'
import type { ColumnProps } from '@/stores/column'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  list: {
    type: Array as PropType<ColumnProps[]>,
    required: true
  }
})

const columnList = computed(() => {
  return props.list.map((column) => {
    addColumnAvatar(column, 50, 50)

    return column
  })
})

const toColumn = (columnId: any) => {
  router.push(`/column/${columnId}`)
}
</script>
<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>
