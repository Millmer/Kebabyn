<template>
  <div class="h-10 w-32">
    <div class="text-left">
      <label class="font-bold mb-1">{{ name }}</label>
    </div>
    <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
      <button @click="decrement" class="h-full border-2 border-solid border-white w-20 rounded-l cursor-pointer outline-none">
        <span class="m-auto text-2xl font-thin">-</span>
      </button>
      <p class="m-auto px-5 text-white text-bold align-middle text-center">{{ internalCount }}</p>
      <button @click="increment" class="h-full border-2 border-solid border-white w-20 rounded-r cursor-pointer outline-none">
        <span class="m-auto text-2xl font-thin">+</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CounterInput',
  props: {
    name: {
      type: String,
      default: "Counter"
    },
    value: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      internalCount: 0,
    }
  },
  mounted() {
    this.internalCount = this.value;
  },
  methods: {
    decrement() {
      if (this.internalCount - 1 < this.min) return;
      this.internalCount--;
      this.$emit("input", this.internalCount);
    },
    increment() {
      if (this.internalCount + 1 > this.max) return;
      this.internalCount++;
      this.$emit("input", this.internalCount);
    }
  },
  watch: {
    value(newVal) {
      this.internalCount = newVal;
    }
  }
}
</script>
