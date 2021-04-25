import Vue from 'vue'

class AuthService {
  constructor(store) {
    this.$store = store
  }

  get isAuthenticated() {
    return this.$store.state.auth.isAuthenticated
  }

  get user() {
    return this.$store.state.auth.user
  }

  get name() {
    if (!this.user) return
    return this.user.signInUserSession.idToken.payload.name
  }

  get firstName() {
    if (!this.user) return
    return this.name.split(' ')[0]
  }

  get initials() {
    if (!this.user) return
    return this.name
      .match(/(^\S\S?|\b\S)?/g)
      .join('')
      .match(/(^\S|\S$)?/g)
      .join('')
      .toUpperCase()
  }

  get email() {
    if (!this.user) return
    return this.user.signInUserSession.idToken.payload.email
  }

  get picture() {
    if (!this.user) return
    return (
      this.user.signInUserSession.idToken.payload.picture ||
      `https://eu.ui-avatars.com/api/?background=random&name=${this.initials}`
    )
  }
}

export default async ({ store }) => {
  const authService = new AuthService(store)
  Vue.prototype.$auth = authService
  Vue.$auth = authService
  await store.dispatch('auth/load')
}
