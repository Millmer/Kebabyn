<template>
  <main class="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold text-kebabyn-primary">401</p>
      <div class="flex flex-col">
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Hi {{ $auth.firstName }}!</h1>
        <Kebab class="w-16 h-16" />
      </div>
      <p class="mt-6 text-base leading-7 text-gray-600">I'm sorry, the kebab shop can't serve you for the time being. Special customers only.</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <Button size="sm" class="bg-kebabyn-primary" :onClick="() => this.$store.dispatch('auth/logout')">Logout</Button>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'empty',
}
</script>
