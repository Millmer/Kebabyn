import Vue from 'vue'
import { API, Cache } from 'aws-amplify'

class APIService {
  constructor($toast) {
    this.$toast = $toast
    this.API = API
    this.apiName = 'KebabynAPI'
  }

  _createAutoResolvePromise(value) {
    return new Promise((resolve) => resolve(value))
  }

  async get(...args) {
    const key = args[0]
    let cached = Cache.getItem(key)
    if (!cached) {
      try {
        cached = await this.API.get(this.apiName, ...args)
        const fiveMinsFromNow = new Date().getTime() + 5 * 60 * 1000
        Cache.setItem(key, cached, { expires: fiveMinsFromNow })
      } catch (error) {
        this.$toast.error('Network Error', {
          action: {
            text: 'Retry',
            onClick: (e, toast) => {
              this.get(...args)
              toast.goAway(0)
            },
          },
        })
        throw error
      }
    }
    return this._createAutoResolvePromise(cached)
  }

  async post(...args) {
    try {
      const response = await this.API.post(this.apiName, ...args)
      return this._createAutoResolvePromise(response)
    } catch (error) {
      this.$toast.error('Network Error')
      throw error
    }
  }
}

export default ({ $toast }) => {
  const apiService = new APIService($toast)
  Vue.prototype.$http = apiService
  Vue.$http = apiService
}
