<template>
  <n-modal v-model:show="showModal">
    <div>
      <component :is="pwdStore.validate == 1 ? Login : Signup" />
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import { usePwdStore } from '@/stores/pwd'

const pwdStore = usePwdStore()

const showModal = ref(false)
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
  /* position: relative;
  left: 50%;
  top: 50%; */
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
