<template>
  <div class="max-w-md mx-auth pt-6">
    <div class="flex min-h-screen justify-center items-center">
      <h1 class="text-xl mb-3">Login</h1>
      <div class="flex flex-col" v-if="!$auth.isAuthenticated">
        <button @click="$store.dispatch('auth/login')" class="button">Login</button>
      </div>
      <div class="flex flex-col" v-else>
        You're logged in as {{ $auth.email }}
        <button @click="$store.dispatch('auth/logout')">Logout</button>
      </div>
    </div>
  </div>
</template>
