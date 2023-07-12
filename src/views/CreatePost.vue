<template>
  <div class="create-post-page">
    <h4>{{ isEditMode ? '编辑文章' : '新建文章' }}</h4>
    <uploader
      action="/upload"
      :beforeUpload="uploadCheck"
      @file-uploaded="handleFileUploaded"
      :uploaded="uploadedData"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
    >
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <div class="uploaded-area">
          <img :src="dataProps.uploadedData && dataProps.uploadedData.data.url" />
          <h3>点击重新上传</h3>
        </div>
      </template>
    </uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <editor
          v-model="contentVal"
          :options="editorOptions"
          @blur="checkEditor"
          :class="{ 'is-invalid': !editorStatus.isValid }"
        >
        </editor>
        <span v-if="!editorStatus.isValid" class="invalid-feedback mt-1">{{
          editorStatus.message
        }}</span>
      </div>
      <template #submit>
        <n-button type="info">
          {{ isEditMode ? '更新文章' : '发表文章' }}
        </n-button>
      </template>
    </validate-form>
  </div>
  <div style="height: 150px"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'

import { useRouter, useRoute } from 'vue-router'
import { type Options } from 'easymde'
import { usePostStore, type PostProps } from '@/stores/post'
import { useUserStore } from '@/stores/user'
import ValidateInput, { type RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import Uploader from '../components/Uploader.vue'
import Editor from '../components/Editor.vue'
import { beforeUploadCheck } from '../helper'
import type { ImageProps, ResponseType } from '@/types'

const uploadedData = ref()
const titleVal = ref('')
const editorStatus = reactive({
  isValid: true,
  message: ''
})
const router = useRouter()
const route = useRoute()
const isEditMode = !!route.query.id
const postId = route.query.id as string

const postStore = usePostStore()
const userStore = useUserStore()
const textArea = ref<null | HTMLTextAreaElement>(null)
let imageId = ''
const editorOptions: Options = {
  spellChecker: false
}
const titleRules: RulesProp = [{ type: 'required', message: '文章标题不能为空' }]
const contentVal = ref('')
const contentRules: RulesProp = [{ type: 'required', message: '文章详情不能为空' }]
const checkEditor = () => {
  if (contentVal.value.trim() === '') {
    editorStatus.isValid = false
    editorStatus.message = '文章详情不能为空'
  } else {
    editorStatus.isValid = true
    editorStatus.message = ''
  }
}
onMounted(() => {
  if (isEditMode) {
    postStore.fetchPost(postId).then((currentPost) => {
      if (currentPost.image) {
        uploadedData.value = { data: currentPost.image }
      }
      titleVal.value = currentPost.title
      contentVal.value = currentPost.content || ''
    })
  }
})
const handleFileUploaded = (rawData: ResponseType<ImageProps>) => {
  if (rawData.data._id) {
    imageId = rawData.data._id
  }
}
const onFormSubmit = async (result: boolean) => {
  checkEditor()
  if (result && editorStatus.isValid && userStore.data) {
    const { column, _id } = userStore.data
    if (column) {
      const newPost: PostProps = {
        title: titleVal.value,
        content: contentVal.value,
        column,
        author: _id
      }
      if (imageId) {
        newPost.image = imageId
      }
      // const actionName = isEditMode ? 'updatePost' : 'createPost'
      // const sendData = isEditMode
      //   ? {
      //       id: route.query.id,
      //       payload: newPost
      //     }
      //   : newPost
      if (isEditMode) {
        await postStore.updatePost(postId, newPost)
        window.$message.success('更新成功，2秒后跳转到文章', {
          duration: 2000
        })
      } else {
        await postStore.createPost(newPost)
        window.$message.success('发表成功，2秒后跳转到文章', {
          duration: 2000
        })
      }

      setTimeout(() => {
        router.push({ name: 'column', params: { id: column } })
      }, 2000)
    }
  }
}
const uploadCheck = (file: File) => {
  const result = beforeUploadCheck(file, {
    format: ['image/jpeg', 'image/png'],
    size: 1
  })
  const { passed, error } = result
  if (error === 'format') {
    // createMessage('上传图片只能是 JPG/PNG 格式!', 'error')
    window.$message.warning('发表成功，2秒后跳转到文章', {
      duration: 2000
    })
  }

  if (error === 'size') {
    // createMessage('上传图片大小不能超过 1Mb', 'error')
    window.$message.warning('上传图片大小不能超过 1Mb', {
      duration: 2000
    })
  }
  return passed
}
</script>

<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.uploaded-area {
  position: relative;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>
../stores/post../stores/user ../stores/post ../stores/user
