<template>
  <!--  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link class="navbar-brand" to="/">雷泽</router-link>
    <ul v-if="!isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to="/login" class="btn btn-outline-light my-2">登陆</router-link>
      </li>
      <li class="list-inline-item">
        <router-link to="/signup" class="btn btn-outline-light my-2">注册</router-link>
      </li>
    </ul>
    <ul v-else-if="isLogin && data" class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好 ${data.nickName}`">
          <dropdown-item
            ><router-link to="/create" class="dropdown-item">新建文章</router-link></dropdown-item
          >
          <dropdown-item
            ><router-link :to="`/column/${data.column}`" class="dropdown-item"
              >我的专栏</router-link
            ></dropdown-item
          >
          <dropdown-item disabled><a href="#" class="dropdown-item">编辑资料</a></dropdown-item>
          <dropdown-item
            ><a href="#" class="dropdown-item" @click.prevent="handleLogout"
              >退出登陆</a
            ></dropdown-item
          >
        </dropdown>
      </li>
    </ul>
  </nav> -->
  <n-layout-header class="mb-4">
    <div class="navbar">
      <img class="img" src="@/assets/Razlogo.webp" alt="" srcset="" />
      <router-link class="navbar-brand" to="/">RazColumn</router-link>
    </div>

    <ul v-if="!isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to="/login" class="my-2">登陆</router-link>
      </li>
      <li class="list-inline-item">
        <router-link to="/signup" class="my-2">注册</router-link>
      </li>
    </ul>
    <ul v-else-if="isLogin && data" class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好 ${data.nickName}`">
          <dropdown-item
            ><router-link to="/create" class="dropdown-item">新建文章</router-link></dropdown-item
          >
          <dropdown-item
            ><router-link :to="`/column/${data.column}`" class="dropdown-item"
              >我的专栏</router-link
            ></dropdown-item
          >
          <dropdown-item disabled><a href="#" class="dropdown-item">编辑资料</a></dropdown-item>
          <dropdown-item
            ><a href="#" class="dropdown-item" @click.prevent="handleLogout"
              >退出登陆</a
            ></dropdown-item
          >
        </dropdown>
      </li>
    </ul>
  </n-layout-header>
</template>
<script setup lang="ts">
import { type PropType } from 'vue'
import Dropdown from '@/components/Dropdown.vue'
import DropdownItem from '@/components/DropdownItem.vue'
import { type UserDataProps, useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

defineProps({
  data: {
    type: [Object, null] as PropType<UserDataProps | null>,
    required: true
  },
  isLogin: {
    type: Boolean,
    required: true
  }
})

const userStore = useUserStore()
const router = useRouter()
const handleLogout = () => {
  userStore.logout()
  // createMessage('退出登录成功，2秒后跳转到首页', 'success', 2000)
  window.$message.success('退出登录成功，2秒后跳转到首页', {
    duration: 2000
  })
  setTimeout(() => {
    router.push('/')
  }, 2000)
}
</script>

<style scoped>
.n-layout-header {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 1px 3px hsla(0, 0%, 7%, 0.1);
  padding: 12px;
  justify-content: space-between !important;
  display: flex;
}
.navbar {
  padding: 0;
  justify-content: space-between !important;
  display: flex;
}
img {
  width: 40px;
  height: 40px;
  margin: 5px 5px;
}
</style>
