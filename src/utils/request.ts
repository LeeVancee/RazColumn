import axios from 'axios'
import { useGlobalStore } from '../stores/global'
// 创建实例对象
const request = axios.create({
  baseURL: 'http://apis.imooc.com/api/',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use((config) => {
  const globalStore = useGlobalStore()
  globalStore.setLoading(true)
  globalStore.setError({ status: false, message: '' })
  // get 请求，添加到 url 中
  config.params = { ...config.params, icode: '8446CCF4F4C5B0A0' }
  // 其他请求，添加到 body 中
  // 如果是上传文件，添加到 FormData 中
  if (config.data instanceof FormData) {
    config.data.append('icode', '8446CCF4F4C5B0A0')
  } else {
    // 普通的 body 对象，添加到 data 中
    config.data = { ...config.data, icode: '8446CCF4F4C5B0A0' }
  }
  return config
})
//响应拦截器
request.interceptors.response.use(
  (config) => {
    const globalStore = useGlobalStore()
    setTimeout(() => {
      globalStore.loading = false
    }, 500)
    return config
  },
  (e) => {
    const globalStore = useGlobalStore()
    const { error } = e.response.data
    globalStore.error = { status: true, message: error }
    globalStore.loading = false
    // store.commit('setError', { status: true, message: error })
    // store.commit('setLoading', false)
    return Promise.reject(e.response.data)
  }
)
export default request
