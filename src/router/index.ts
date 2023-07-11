import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/layout/index.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import ColumnDetail from '@/views/ColumnDetail.vue'
import CreatePost from '@/views/CreatePost.vue'
import PostDetail from '@/views/PostDetail.vue'
import HomePage from '@/views/HomePage.vue'
import { useUserStore } from '@/stores/user'
import request from '@/utils/request'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/homepage',
      children: [
        {
          path: '/homepage',
          name: 'homepage',
          component: HomePage
        },
        {
          path: '/create',
          name: 'create',
          component: CreatePost,
          meta: { requiredLogin: true }
        },
        {
          path: '/column/:id',
          name: 'column',
          component: ColumnDetail
        },
        {
          path: '/posts/:id',
          name: 'post',
          component: PostDetail
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { redirectAlreadyLogin: true }
    },

    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: { redirectAlreadyLogin: true }
    }
  ]
})
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!userStore.isLogin) {
    if (userStore.token) {
      request.defaults.headers.common.Authorization = `Bearer ${userStore.token}`
      userStore
        .fetchCurrentUser()
        .then(() => {
          if (redirectAlreadyLogin) {
            next('/')
          } else {
            next()
          }
        })
        .catch((e: any) => {
          console.error(e)
          userStore.logout()
          next('login')
        })
    } else {
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
