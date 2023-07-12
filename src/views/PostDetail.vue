<template>
  <div class="post-detail-page">
    <Modal
      v-model:show="modalIsVisible"
      :content="content"
      :title="title"
      @modal-on-confirm="hideAndDelete"
    />
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img
        :src="currentImageUrl"
        alt="currentPost.title"
        class="rounded-lg img-fluid my-4"
        v-if="currentImageUrl"
      />
      <h2 class="mb-4">{{ currentPost.title }}</h2>
      <div
        class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0"
      >
        <div class="col">
          <user-profile
            :user="currentPost.author"
            v-if="typeof currentPost.author === 'object'"
          ></user-profile>
        </div>
        <span class="text-muted col text-right font-italic"
          >发表于：{{ currentPost.createdAt }}</span
        >
      </div>
      <div v-html="currentHTML"></div>
      <div v-if="showEditArea" class="btn-group mt-2">
        <n-button type="primary" @click="edit"> 编辑</n-button>
        <n-button type="error" @click="deletePost" class="button"> 删除 </n-button>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { marked } from 'marked'
import { useRoute, useRouter } from 'vue-router'
import { usePostStore } from '@/stores/post'
import { useUserStore, type UserDataProps } from '@/stores/user'
import { type ImageProps } from '@/stores/utils'
import UserProfile from '../components/UserProfile.vue'
import Modal from '@/components/Modal.vue'

const route = useRoute()
const router = useRouter()
const postStore = usePostStore()
const userStore = useUserStore()
const modalIsVisible = ref(false)
const title = ref('删除文章')
const content = ref('确认删除这篇文章吗')

const currentId = route.params.id as string
onMounted(() => {
  postStore.fetchPost(currentId)
  // store.dispatch('fetchPost', currentId)
})
const currentPost = computed(() => postStore.getCurrentPost(currentId))
const currentHTML = computed(() => {
  if (currentPost.value && currentPost.value.content) {
    const { isHTML, content } = currentPost.value
    return isHTML ? content : marked.parse(content)
  } else {
    return ''
  }
})
const showEditArea = computed(() => {
  if (currentPost.value && currentPost.value.author && userStore.isLogin) {
    const postAuthor = currentPost.value.author as UserDataProps
    return postAuthor._id === userStore.data?._id
  } else {
    return false
  }
})
const currentImageUrl = computed(() => {
  if (currentPost.value && currentPost.value.image) {
    const { image } = currentPost.value
    return (image as ImageProps).url + '?x-oss-process=image/resize,w_850'
  } else {
    return null
  }
})
const edit = () => {
  router.push({ name: 'create', query: { id: currentPost.value._id } })
}
const deletePost = () => {
  modalIsVisible.value = true
}
const hideAndDelete = () => {
  modalIsVisible.value = false
  postStore.deletePost(currentId).then((data) => {
    //  createMessage('删除成功，2秒后跳转到专栏首页', 'success', 2000)
    window.$message.success('删除成功，2秒后跳转到专栏首页', {
      duration: 2000
    })
    setTimeout(() => {
      router.push({ name: 'column', params: { id: data.column } })
    }, 2000)
  })
}
</script>
<style>
.button {
  margin-left: 10px;
}
</style>
