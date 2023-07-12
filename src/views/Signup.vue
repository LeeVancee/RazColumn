<template>
  <div class="signup-page signup-wrapper">
    <h5 class="header">注册RazColumn账户</h5>
    <div class="form">
      <validate-form @form-submit="onFormSubmit">
        <validate-input
          :rules="emailRules"
          v-model="formData.email"
          placeholder="请输入邮箱地址"
          type="text"
        />

        <validate-input
          :rules="nameRules"
          v-model="formData.nickName"
          placeholder="请输入昵称"
          type="text"
        />

        <validate-input
          type="password"
          placeholder="请输入密码"
          :rules="passwordRules"
          v-model="formData.password"
        />

        <validate-input
          type="password"
          placeholder="请再次密码"
          :rules="repeatPasswordRules"
          v-model="formData.repeatPassword"
        />

        <template #submit>
          <button type="submit" class="btn btn-primary btn-block btn-large">注册新用户</button>
        </template>
      </validate-form>
    </div>
    <div class="message">
      <div class="msg">
        have account?
        <a href="javascript:void(0)" @click="toLogin">Login</a>
      </div>
      <div class="msg">
        back to
        <router-link to="/">首页</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePwdStore } from '@/stores/pwd'
import axios from 'axios'
import ValidateInput, { type RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'

const pwdStore = usePwdStore()
const formData = reactive({
  email: '',
  nickName: '',
  password: '',
  repeatPassword: ''
})
const router = useRouter()
const emailRules: RulesProp = [
  { type: 'required', message: '电子邮箱地址不能为空' },
  { type: 'email', message: '请输入正确的电子邮箱格式' }
]
const nameRules: RulesProp = [{ type: 'required', message: '昵称不能为空' }]
const passwordRules: RulesProp = [{ type: 'required', message: '密码不能为空' }]
const repeatPasswordRules: RulesProp = [
  { type: 'required', message: '重复密码不能为空' },
  {
    type: 'custom',
    validator: () => {
      return formData.password === formData.repeatPassword
    },
    message: '密码不相同'
  }
]
const onFormSubmit = (result: boolean) => {
  if (result) {
    const payload = {
      email: formData.email,
      password: formData.password,
      nickName: formData.nickName
    }
    axios
      .post('/users/', payload)
      .then((data) => {
        // createMessage('注册成功 正在跳转登录页面', 'success', 2000)
        window.$message.success('注册成功，正在跳转登录页面', {
          duration: 2000
        })
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      })
      .catch((e) => {
        console.log(e)
      })
  }
}
const toLogin = () => {
  pwdStore.change(1)
}
</script>

<style scoped>
.signup-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #9fc3db, #00aeef);
  background-size: cover;
  position: fixed;
}
.signup-wrapper {
  background-color: #fff;
  width: 458px;
  height: 788px;
  border-radius: 15px;
  padding: 0 50px;
  /*  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
}
.header {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
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
