<template>
  <div class="w-full flex flex-col space-y-20 justify-center items-center">
    <h1 class="text-4xl">Welcome to Kebabyn</h1>
    <Button
      v-if="!$auth.isAuthenticated"
      :on-click="() => $store.dispatch('auth/login')"
      >Login</Button
    >
  </div>
</template>
