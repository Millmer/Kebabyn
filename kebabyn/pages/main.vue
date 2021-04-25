<template>
  <div class="space-y-12 p-8">
    <h1 class="text-6xl text-center">Welcome back {{ $auth.firstName }}!</h1>
    <transition
      leave-active-class="transition ease-in-out duration-300"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-50"
    >
      <div v-if="show" class="flex flex-col items-center">
        <Button size="lg" :onClick="registerKebab">Register Kebab</Button>
        <a class="mt-2 no-underline cursor-pointer">Do something else?</a>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  layout: 'authenticated',
  data() {
    return {
      show: true,
    }
  },
  methods: {
    registerKebab() {
      this.show = false
    },
  },
}
</script>
