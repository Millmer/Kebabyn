export default function ({ store, route, redirect }) {
  if (process.env.NODE_ENV !== 'development') {
    if (!store.state.auth.isAuthenticated && route.name !== 'auth-login')
      return redirect('/auth/login')
    if (store.state.auth.isAuthenticated && route.name === 'auth-login')
      return redirect('/')
  }
}
