import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import App from './App.vue'
import 'easymde/dist/easymde.min.css'
import '@/assets/main.css'

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)

app.mount('#app')