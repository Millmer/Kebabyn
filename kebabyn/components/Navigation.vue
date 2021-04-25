<template>
  <nav>
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0 flex items-center">
            <Logo logo-only class="block lg:hidden h-8 w-auto" />
            <Logo class="hidden lg:block h-8 w-auto" />
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <!-- Profile dropdown -->
          <div class="ml-3 relative">
            <div>
              <button
                id="user-menu-button"
                type="button"
                class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-expanded="false"
                aria-haspopup="true"
                @click="show = !show"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  :src="$auth.picture"
                  alt="User Profile Image"
                />
              </button>
            </div>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-class="transition opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="show"
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                <a
                  v-for="(item, i) in usermenu"
                  :id="`user-menu-item-${i}`"
                  :key="`user-menu-item-${i}`"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  tabindex="-1"
                  :href="item.href || '#'"
                  @click="item.action ? item.action() : null"
                  >{{ item.title }}</a
                >
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      usermenu: [
        {
          title: 'Your Profile',
          href: '/',
        },
        {
          title: 'Settings',
          href: '#',
        },
        {
          title: 'Log out',
          action: () => this.$store.dispatch('auth/logout'),
        },
      ],
    }
  },
}
</script>
