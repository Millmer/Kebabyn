export default function ({ store, route, redirect }) {
  if (!store.state.auth.isAuthenticated && route.name !== 'auth-login')
    return redirect('/auth/login')
  if (store.state.auth.isAuthenticated && route.name === 'auth-login')
    return redirect('/')
}
