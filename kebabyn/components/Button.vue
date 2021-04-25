<template>
  <button :class="actionClass" :disabled="disabled" @click="onClick">
    <Kebab v-if="loading" class="animate-spin h-8 w-8 mr-3 inline-block align-middle" />
    <slot class="inline-block align-middle" />
  </button>
</template>

<script>
export default {
  name: 'ActionButton',
  props: {
    onClick: {
      type: Function,
      required: true,
    },
    size: {
      type: String,
      default: 'lg',
      validator(value) {
        return ['sm', 'md', 'lg'].includes(value)
      },
    },
    full: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    actionClass() {
      let classNames = [
        'bg-none',
        'bg-transparent',
        'text-white',
        'relative',
        'leading-normal',
        'font-bold',
        'border-2',
        'border-solid',
        'border-white',
        'rounded-md',
        'outline-none',
        'cursor-pointer',
        'transition-all',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
      ]
      const sizeClassNames = {
        sm: ['py-1', 'px-2', 'text-lg'],
        md: ['py-2', 'px-4', 'w-60', 'text-2xl'],
        lg: ['py-4', 'px-8', 'w-100', 'text-3xl'],
      }
      classNames = [...classNames, ...sizeClassNames[this.size]]
      if (this.full) classNames.push('w-full')
      if (this.disabled)
        classNames = classNames.filter((cls) => !cls.includes('hover:'))
      if (this.loading) classNames.push('bg-black', 'text-white')
      return classNames.join(' ')
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  &:enabled:hover {
    @apply bg-kebabyn-secondary;
    border: none;
    outline: 4px solid white;
    outline-offset: -4px;
    outline-width: 8px;
  }

  &:enabled:not(:hover):before {
    @apply bg-kebabyn-secondary;
    position: absolute;
    content: '';
    height: 100%;
    width: 100%;
    top: 0.5em;
    left: 0.5em;
    z-index: -1;
    border-radius: 0.2em;
  }

  &:focus {
    outline: none;
  }
}
</style>
