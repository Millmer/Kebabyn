<template>
    <div class="mb-5 w-64 z-30">
      <label for="datepicker" class="font-bold mb-1 block">Select Date</label>
      <div class="relative">
        <input type="hidden" name="date" ref="date" />
        <input
          type="text"
          readonly
          v-model="datepickerValue"
          @click="showDatepicker = !showDatepicker"
          @keydown.escape="showDatepicker = false"
          class="
            w-full
            pl-4
            pr-10
            py-3
            leading-none
            rounded-lg
            shadow-sm
            focus:outline-none focus:shadow-outline
            text-gray-600
            font-medium
          "
          placeholder="Select date"
        />

        <div
          class="absolute top-1 right-0 px-3 py-2"
          @click="showDatepicker = !showDatepicker"
        >
          <svg
            class="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        <div
          class="bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0"
          style="width: 17rem"
          v-if="showDatepicker"
        >
          <div class="flex justify-between items-center mb-2">
            <div>
              <span class="text-lg font-bold text-gray-800">{{
                MONTH_NAMES[month]
              }}</span>
              <span class="ml-1 text-lg text-gray-600 font-normal">{{
                year
              }}</span>
            </div>
            <div>
              <button
                type="button"
                class="
                  transition
                  ease-in-out
                  duration-100
                  inline-flex
                  cursor-pointer
                  hover:bg-gray-200
                  p-1
                  rounded-full
                "
                :class="{ 'cursor-not-allowed opacity-25': isAtMin }"
                :disabled="isAtMin"
                @click="
                  monthDecrement()
                  getNoOfDays()
                "
              >
                <svg
                  class="h-6 w-6 text-gray-500 inline-flex"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                type="button"
                class="
                  transition
                  ease-in-out
                  duration-100
                  inline-flex
                  cursor-pointer
                  hover:bg-gray-200
                  p-1
                  rounded-full
                "
                :class="{ 'cursor-not-allowed opacity-25': isAtMax }"
                :disabled="isAtMax"
                @click="
                  monthIncrement()
                  getNoOfDays()
                "
              >
                <svg
                  class="h-6 w-6 text-gray-500 inline-flex"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex flex-wrap mb-3 -mx-1">
            <div
              v-for="(day, index) in DAYS"
              :key="`day-${index}`"
              style="width: 14.26%"
              class="px-1"
            >
              <div class="text-gray-800 font-medium text-center text-xs">
                {{ day }}
              </div>
            </div>
          </div>

          <div class="flex flex-wrap -mx-1">
            <div
              v-for="blankday in blankdays"
              style="width: 14.28%"
              class="text-center border p-1 border-transparent text-sm"
              :key="`blank-${blankday}`"
            ></div>
              <div
                v-for="(date, dateIndex) in no_of_days"
                :key="`date-${dateIndex}`"
                style="width: 14.28%"
                class="px-1 mb-1"
              >
                <div
                  @click="getDateValue(date)"
                  class="
                    cursor-pointer
                    text-center text-sm
                    rounded-full
                    leading-loose
                    transition
                    ease-in-out
                    duration-100
                  "
                  :class="{
                    'bg-blue-500 text-white': isToday(date) == true,
                    'text-gray-700 hover:bg-blue-200': isToday(date) == false,
                  }"
                >
                  {{ date }}
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default {
  name: 'DatePicker',
  props: {
    minDate: {
      type: [Date, String],
    },
    maxDate: {
      type: [Date, String],
    },
  },
  data() {
    return {
      showDatepicker: false,
      datepickerValue: '',
      month: null,
      year: null,
      isAtMin: false,
      isAtMax: false,
      no_of_days: [],
      blankdays: [],
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      MONTH_NAMES,
      DAYS,
    }
  },
  mounted() {
    this.initDate()
    this.getNoOfDays()
  },
  methods: {
    initDate() {
      let today = new Date()
      this.month = today.getMonth()
      this.year = today.getFullYear()
      this.datepickerValue = new Date(
        this.year,
        this.month,
        today.getDate()
      ).toDateString()
      this.$emit('input', this.datepickerValue)
    },
    isToday(date) {
      const today = new Date()
      const d = new Date(this.year, this.month, date)

      return today.toDateString() === d.toDateString() ? true : false
    },
    getDateValue(date) {
      let selectedDate = new Date(this.year, this.month, date)
      this.datepickerValue = selectedDate.toDateString()
      this.showDatepicker = false
      this.$emit('input', this.datepickerValue)
    },
    getNoOfDays() {
      let daysInMonth = new Date(this.year, this.month + 1, 0).getDate()

      // find where to start calendar day of week
      let dayOfWeek = new Date(this.year, this.month).getDay()
      let blankdaysArray = []
      for (var i = 1; i <= dayOfWeek; i++) {
        blankdaysArray.push(i)
      }

      let daysArray = []
      for (var i = 1; i <= daysInMonth; i++) {
        daysArray.push(i)
      }

      this.blankdays = blankdaysArray
      this.no_of_days = daysArray
    },
    monthDecrement() {
      if (this.month - 1 == -1) {
        this.month = 11
        this.year--
      } else {
        this.month--
      }

      this.isAtMax = false
      const pickedDate = new Date(this.year, this.month)
      if (this.minDate) {
        const minDateObject = new Date(this.minDate)
        this.isAtMin = pickedDate < minDateObject
      }
    },
    monthIncrement() {
      if (this.month + 1 == 12) {
        this.month = 0
        this.year++
      } else {
        this.month++
      }

      this.isAtMin = false
      const pickedDate = new Date(this.year, this.month)
      if (this.maxDate) {
        const maxDateObject = new Date(this.maxDate)
        this.isAtMax = pickedDate > maxDateObject
      }
    },
  }
}
</script>
