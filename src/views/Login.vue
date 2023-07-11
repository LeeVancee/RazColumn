<template>
  <div class="login-container">
    <div class="login-page login-wrapper">
      <h5 class="header">登录到下北泽</h5>
      <div class="form">
        <validate-form @form-submit="onFormSubmit">
          <validate-input
            :rules="emailRules"
            v-model="emailVal"
            placeholder="请输入邮箱地址"
            type="text"
            ref="inputRef"
          />
          <validate-input
            type="password"
            placeholder="请输入密码"
            :rules="passwordRules"
            v-model="passwordVal"
          />

          <template #submit>
            <button type="submit" class="btn btn-primary btn-block btn-large">登录</button>
          </template>
        </validate-form>
      </div>
      <div class="message">
        <div class="msg">
          Don't have account?
          <router-link to="/signup">Sign up</router-link>
        </div>
        <div class="msg">
          back to
          <router-link to="/">首页</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ValidateInput, { type RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { useUserStore } from '@/stores/user'

const emailVal = ref('vancee777@outlook.com')
const router = useRouter()
const userStore = useUserStore()
// const message = useMessage()
const emailRules: RulesProp = [
  { type: 'required', message: '电子邮箱地址不能为空' },
  { type: 'email', message: '请输入正确的电子邮箱格式' }
]
const passwordVal = ref('leevancee@701')
const passwordRules: RulesProp = [{ type: 'required', message: '密码不能为空' }]
const onFormSubmit = async (result: boolean) => {
  if (result) {
    try {
      await userStore.login(emailVal.value, passwordVal.value)
      await userStore.fetchCurrentUser()
      window.$message.success('登录成功 2秒后跳转首页', { duration: 2000 })
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #9fc3db, #00aeef);
  background-size: cover;
  position: fixed;
}
.login-wrapper {
  background-color: #fff;
  width: 458px;
  height: 588px;
  border-radius: 15px;
  padding: 0 50px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.header {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
}
.input-itemsss {
  /*  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;

  font-size: 15px;
  outline: none; */
  border-bottom: 1px solid rgb(128, 125, 125);
}
.input-item:placeholder {
  text-transform: uppercase;
}
.btn {
  border: none;
  text-align: center;
  padding: 10px;
  width: 100%;
  margin-top: 40px;
  background: linear-gradient(to right, #9fc3db, #00aeef);
  color: #fff;
}
.message {
  margin-top: 20px;
}
.msg {
  text-align: center;
  line-height: 44px;
}
a {
  text-decoration-line: none;
  color: #abc1ee;
}
</style>
../stores/user ../stores/user
