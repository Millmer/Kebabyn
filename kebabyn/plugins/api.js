import Vue from 'vue'
import { API, Cache } from 'aws-amplify'

class APIService {
  constructor($toast, redirect) {
    this.API = API
    this.$toast = $toast
    this.redirect = redirect
    this.apiName = 'KebabynAPI'
    this.Cache = Cache.createInstance({
      keyPrefix: 'KebabynAPICache',
      defaultTTL: 5 * 60 * 1000, // 5 minutes
    })
  }

  _createAutoResolvePromise(value) {
    return new Promise((resolve) => resolve(value))
  }

  async get(options, ...args) {
    const key = args[0]
    let value = this.Cache.getItem(key)
    if (!value || options.skipCache) {
      try {
        value = await this.API.get(this.apiName, ...args)
        this.Cache.setItem(key, value)
      } catch (error) {
        if (error.response && [401, 403].includes(error.response.status)) {
          this.$toast.error(error.response.data.message)
          this.redirect('/auth/unauthorised')
        } else {
          this.$toast.error('Network Error', {
            action: {
              text: 'Retry',
              onClick: (e, toast) => {
                this.get(...args)
                toast.goAway(0)
              },
            },
          })
        }
        throw error
      }
    }
    return this._createAutoResolvePromise(value)
  }

  async post(...args) {
    try {
      const response = await this.API.post(this.apiName, ...args)
      return this._createAutoResolvePromise(response)
    } catch (error) {
        console.error(error)
        if (error.response) {
          this.$toast.error(error.response.data.message);
        } else {
          this.$toast.error(typeof error === 'string' ? error : error.message ? error.message : 'Unknown server error')
        }
        throw error
    }
  }
}

export default ({ $toast, redirect }) => {
  const apiService = new APIService($toast, redirect)
  Vue.prototype.$http = apiService
  Vue.$http = apiService
}
