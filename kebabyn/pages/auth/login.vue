<template>
  <div class="max-w-md mx-auth pt-6">
    <div class="flex min-h-screen justify-center items-center">
      <h1 class="text-xl mb-3">Login</h1>
      <div v-if="!$auth.isAuthenticated" class="flex flex-col">
        <button class="button" @click="$store.dispatch('auth/login')">
          Login
        </button>
      </div>
      <div v-else class="flex flex-col">
        You're logged in as {{ $auth.email }}
        <button @click="$store.dispatch('auth/logout')">Logout</button>
      </div>
    </div>
  </div>
</template>
