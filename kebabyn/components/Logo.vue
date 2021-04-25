<template>
  <NuxtLink to="/">
    <span class="inline-block align-middle">
      <Kebab class="w-16 h-16" />
    </span>
    <p
      v-if="!logoOnly"
      class="inline-block font-bold uppercase align-middle text-lg text-white"
    >
      Kebabyn
    </p>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    logoOnly: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
