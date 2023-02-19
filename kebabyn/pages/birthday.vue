<template>
  <div class="min-h-screen flex flex-col">
    <div class="m-auto flex justify-center items-center text-center">
      <div>
        <lottie
          class="absolute top-0 left-0"
          :options="lottieOptions"
          @animCreated="handleAnimation"
        />
        <div class="flex flex-col space-y-28 mb-10">
          <h1 class="block font-light text-5xl sm:text-8xl tracking-widest">
            <span ref="birthday" class="birthday">Happy Birthday! 🎉</span>
          </h1>
          <div>
            <h2 class="block font-light text-5xl tracking-wider mb-5">
              Welcome to Kebabyn
            </h2>
            <button @click="() => tl.play()">
              <span class="label">Open 🎁</span>
            </button>
          </div>
        </div>
        <div class="flex flex-col space-y-2">
          <div class="flex flex-col space-y-3">
            <p class="text-lg">You have a years supply of kebabs<sup>*</sup></p>

            <p class="text-base">Come back soon to register your first!</p>
            <p class="text-sm">
              Bring proof of who you are, I'll be checking 🧐
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-shrink-0 m-1">
      <button
        class="p-2 cursor-pointer text-xs float-left border border-white rounded-sm"
        @click="signOut()"
      >
        Log Out
      </button>
      <p class="text-xs float-right">
        <sup>*</sup>Based on an average of 2 pittas a week,
        <i>ingen salat</i> of course 😉
      </p>
    </div>
  </div>
</template>

<script>
import lottie from 'vue-lottie/src/lottie.vue'
import { gsap, Power2, Elastic, CSSRulePlugin } from 'gsap/all'
import * as animationData from '~/assets/confetti.json'

export default {
  components: {
    lottie,
  },
  data() {
    return {
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default, loop: true },
      tl: null,
      kebabs: [],
    }
  },
  mounted() {
    this.$nextTick(() => {
      gsap.registerPlugin(CSSRulePlugin)
      const rule = CSSRulePlugin.getRule('button::before')
      const tl = gsap.timeline({ defaults: { ease: Power2.easeOut } })
      tl.to('.label', {
        opacity: 0,
        height: 0,
        position: 'absolute',
        duration: '.2s',
      })
        .to(
          'button',
          {
            borderRadius: '50%',
            width: '6em',
            height: '6em',
            ease: Elastic.easeOut.config(0.7, 0.3),
            duration: 1.2,
          },
          '-=.7s'
        )
        .to(rule, { borderRadius: '50%' }, '-=1s')
        .to('svg', { display: 'block' }, '-=1')
        .to('svg', { strokeDasharray: '90 103', duration: 1 }, '-=0.25')
        .to('p', { clipPath: 'circle(100% at 50% 50%)', duration: 1.2 })
      tl.pause()
      this.tl = tl
    })
  },
  methods: {
    handleAnimation(anim) {
      this.anim = anim
    },
    async getKebabs() {
      try {
        this.kebabs = await this.$http.get('/kebabs/list')
      } catch (error) {
        this.kebabs = []
      }
    },
  },
}
</script>

<style scoped lang="scss">
svg {
  display: none;
  stroke-dasharray: 0 103;
}
</style>
