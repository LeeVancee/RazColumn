<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img src="../assets/callout.svg" alt="callout" class="w-50" />
          <h2 class="font-weight-light">随心写作，自由表达</h2>
          <n-button type="info"> 开始写文章 </n-button>
        </div>
      </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
    <column-list :list="list"></column-list>
    <!-- <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25 d-block"></button> -->
    <n-button class="mt-2 mb-5 mx-auto w-25 d-block" @click="loadMorePage" v-if="!isLastPage">
      <a class="mx-auto"> 加载更多</a>
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useColumnStore } from '@/stores/column'
import useLoadMore from '../hooks/useLoadMore2'
import ColumnList from '../components/ColumnList.vue'

const columnStore = useColumnStore()
const total = computed(() => columnStore.total)
const currentPage = computed(() => columnStore.currentPage)
// const selectedColumn = computed(() => testStore.getDataById('2345'))
onMounted(() => {
  columnStore.fetchColumns({ pageSize: 6 })
  // store.dispatch('fetchColumns', { pageSize: 3 })
})
const list = computed(() => columnStore.getColumns)
const { loadMorePage, isLastPage } = useLoadMore(columnStore, 'fetchColumns', {
  total,
  currentPage,
  pageSize: 3
})
</script>
