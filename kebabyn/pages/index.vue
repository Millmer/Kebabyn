<template>
  <section class="py-10 sm:py-16 lg:py-24">
    <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <div class="text-center">
        <h2 class="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          Welcome back {{ $auth.firstName }}!
        </h2>
        <p class="mt-4 text-2xl font-medium">
          {{ numberOfKebabs }} kebabs added to date
        </p>

        <div class="space-y-8">
          <transition
            enter-active-class="transition ease-in-out duration-300"
            enter-class="transform opacity-0 scale-50"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in-out duration-300"
            leave-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-50"
          >
            <div
              v-if="!showAddKebab"
              class="
                flex flex-col
                items-center
                justify-center
                px-16
                space-y-4
                sm:space-y-0 sm:space-x-4 sm:flex-row
                lg:mt-12
                sm:px-0
              "
            >
              <Button size="md" :onClick="() => (showAddKebab = true)"
                >Add Kebab</Button
              >
              <Button size="md" :onClick="getKebabs">See History</Button>
            </div>
          </transition>

          <transition
            enter-active-class="transition ease-in-out duration-300"
            enter-class="transform opacity-0 scale-50"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in-out duration-300"
            leave-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-50"
          >
            <div v-if="showAddKebab" class="mt-5 md:col-span-2 md:mt-0">
              <div class="px-4 py-5 sm:p-6 w-1/2 m-auto">
                <p class="text-base">
                  You have 2 years supply of kebabs from Feb 2023 until Feb 2025
                </p>
                <p class="text-base mb-4">
                  Choose a date and input how many kebabs you had<sup>*</sup>
                </p>
                <div class="flex flex-col items-center justify-evenly space-y-10 mb-8 lg:items-start md:space-y-0 md:space-x-10 md:flex-row md:mb-6">
                  <CounterInput
                    name="Kebab Count"
                    :min="1"
                    :max="2"
                    v-model="registerKebabForm.amount"
                  />
                  <DatePicker
                    @input="dateChosen"
                    minDate="2023-02-01"
                    maxDate="2024-01-31"
                  />
                </div>
                <div
                  class="
                    flex flex-col
                    items-center
                    justify-center
                    px-16
                    space-y-4
                    sm:space-y-0 sm:space-x-4 sm:flex-row
                    lg:mt-12
                    sm:px-0
                  "
                >
                  <Button size="md" full :onClick="registerKebab">Add</Button>
                  <Button size="md" :onClick="() => (showAddKebab = false)"
                    >Back</Button
                  >
                </div>
              </div>
              <p class="text-xs absolute bottom-2 right-6">
                <sup>*</sup>Based on an average of 2 pittas a week,
                <i>ingen salat</i> of course 😉
              </p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'authenticated',
  data() {
    return {
      showAddKebab: false,
      numberOfKebabs: 20,
      kebabs: [],
      registerKebabForm: {
        amount: 1,
      },
      chosenDate: '',
    }
  },
  methods: {
    dateChosen(value) {
      this.chosenDate = value
    },
    registerKebab() {
      this.numberOfKebabs++
    },
    getKebabs() {
      this.$router.push({ path: '/history' })
    },
  },
}
</script>
