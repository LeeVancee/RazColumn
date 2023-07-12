<template>
  <n-layout-header class="mb-4">
    <div class="left navbar">
      <img class="img" src="@/assets/Razlogo.webp" alt="" srcset="" />
      <router-link class="navbar-brand" to="/">RazColumn</router-link>
    </div>
    <div class="right navbar">
      <ul v-if="!isLogin" class="list-inline mb-0">
        <li class="list-inline-item">
          <n-button @click="showModal">登录</n-button>
          <Modal v-model:show="modal" />
        </li>
      </ul>
      <ul v-else-if="isLogin && data" class="list-inline mb-0">
        <n-dropdown trigger="hover" :options="dropdownItem.options">
          <n-space class="d-flex align-items-center">
            <n-avatar round :size="36" :src="avatar" />
            你好！{{ data.nickName }}
          </n-space>
        </n-dropdown>
      </ul>
    </div>
  </n-layout-header>
</template>
<script setup lang="ts">
import { ref, type PropType, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { type UserDataProps, useUserStore } from '@/stores/user'
import avatarjpg from '@/assets/avatar.jpg'
import { usePwdStore } from '@/stores/pwd'
import Modal from '@/components/LoginAndSign.vue'

const pwdStore = usePwdStore()

const avatar = ref(avatarjpg)

const props = defineProps({
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
  window.$message.success('退出登录成功', {
    duration: 2000
  })
  /* setTimeout(() => {
    router.push('/')
  }, 2000)  */
  modal.value = false
}

const modal = ref(false)
const showModal = () => {
  modal.value = true
  pwdStore.validate = 1
}

const dropdownItem = reactive({
  options: [
    {
      label: '新建文章',
      key: 'marina bay sands',
      props: {
        onclick: () => {
          router.push('/create')
        }
      }
    },

    {
      label: '我的专栏',
      key: "brown's hotel, london",
      props: {
        onclick: () => {
          router.push(`/column/${props.data?.column}`)
        }
      }
    },
    {
      label: '编辑资料',
      key: 'atlantis nahamas, nassau',
      disabled: true
    },
    {
      label: '退出登录',
      key: '退出登录成功',
      props: {
        onclick: () => {
          handleLogout()
        }
      }
    }
  ]
})
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
