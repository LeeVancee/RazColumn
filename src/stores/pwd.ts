import { defineStore } from 'pinia'

export const usePwdStore = defineStore('pwd', {
  state: () => {
    return {
      validate: 1
    }
  },
  actions: {
    change(num: number) {
      this.validate = num
    }
  }
})
