<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
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
  </nav>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Dropdown from '@/components/Dropdown.vue'
import DropdownItem from '@/components/DropdownItem.vue'
import { type UserDataProps, useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    data: {
      type: [Object, null] as PropType<UserDataProps | null>,
      required: true
    },
    isLogin: {
      type: Boolean,
      required: true
    }
  },
  setup() {
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
    return {
      handleLogout
    }
  }
})
</script>
@/stores/user @/stores/user
