<template>
  <div class="w-full flex flex-col space-y-20 justify-center items-center">
    <div>
      <h1 class="text-5xl inline-block align-middle">Welcome to <span class="uppercase">Kebabyn</span></h1>
      <Kebab class="w-16 h-16 inline-block align-middle" />
    </div>
    <Button
      v-if="!$auth.isAuthenticated"
      :onClick="() => $store.dispatch('auth/login')"
      >Login</Button
    >
  </div>
</template>
