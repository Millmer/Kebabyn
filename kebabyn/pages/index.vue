<template>
  <div v-if="user" class="min-h-screen flex flex-col">
    <div
      class="m-auto flex justify-center items-center text-center"
    >
      <div>
        <lottie
          class="absolute top-0 left-0"
          :options="lottieOptions"
          @animCreated="handleAnimation"
        />
        <div class="flex flex-col space-y-28  mb-10">
          <h1 class="block font-light text-5xl sm:text-8xl tracking-widest">
            <span ref="birthday" class="birthday">Happy Birthday! 🎉</span>
          </h1>
          <div>
            <h2 class="block font-light text-5xl tracking-wider mb-5">
              Welcome {{ user ? user.name : '' }} to Kebabyn
            </h2>
            <button @click="() => this.tl.play()">
              <span class="label">Open 🎁</span>
              <svg
                class="kebab"
                width="140"
                height="180"
                viewBox="0 0 72 72"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="color">
                  <circle cx="20.7122" cy="27.6923" r="5.9998" fill="#ea5a47" />
                  <path
                    fill="#ea5a47"
                    d="M37.5214,16.0181a5.9553,5.9553,0,1,1-7.872-2.9938A6.0231,6.0231,0,0,1,37.5214,16.0181Z"
                  />
                  <path
                    fill="#b1cc33"
                    d="M49.074,17.0364a2.9614,2.9614,0,0,0-4.8967-.7761,4.9778,4.9778,0,0,0-9.3658,1.9729,3.1021,3.1021,0,0,0-3.0182-.3742,3.44,3.44,0,0,0-1.6966,2.0326,4.9562,4.9562,0,0,0-5.7908.3422,4.8456,4.8456,0,0,0-1.3113,5.98A2.8031,2.8031,0,0,0,20.243,27.43a3.0871,3.0871,0,0,0-.4726,2.582A4.9737,4.9737,0,0,0,14.9,33.218a5.0972,5.0972,0,0,0,1.8267,5.8689,2.9614,2.9614,0,0,0-.7761,4.8967"
                  />
                  <path fill="#b1cc33" d="M25.3144,62.5486l2.8431-1.42" />
                  <path
                    fill="#6a462f"
                    d="M32.5234,29.5145c-1.4062-.4714-1.5993-4.7966-.4246-5.3684.9372-.4562,2.2048,1.74,4.0193,1.3586a3.6124,3.6124,0,0,0,2.2455-2.2266C38.2988,23.2307,34.4768,30.1693,32.5234,29.5145Z"
                  />
                  <path
                    fill="#6a462f"
                    d="M25,31c-.2-.6768-.7176-2.4307,0-3,.8825-.7,2.4466,1.3331,5,1,1.7579-.2294,2.3962-1.3731,3-1,.8387.5182.6443,3.3656-1,5a4.4577,4.4577,0,0,1-5,1A4.6225,4.6225,0,0,1,25,31Z"
                  />
                  <path
                    fill="#a57939"
                    d="M48.8417,17.2263a2.0059,2.0059,0,0,1,2.8143.2827A23,23,0,0,1,16.041,46.6221a2.0059,2.0059,0,0,1,.2827-2.8143Z"
                  />
                </g>
                <g id="line">
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M43.4959,46.9594a.9468.9468,0,0,0,.5491.2363.8683.8683,0,0,0,.5695-.1747"
                  />
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M32.3127,38.0187a.9468.9468,0,0,0,.5491.2363.8683.8683,0,0,0,.5695-.1746"
                  />
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M30.69,47.0944a.9468.9468,0,0,0,.5491.2363.8688.8688,0,0,0,.57-.1746"
                  />
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M44.16,26.86a.8149.8149,0,0,0,.6177.29,1.0579,1.0579,0,0,0,.6919-.3335"
                  />
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M40.2154,37.8348a.8156.8156,0,0,0,.6177.29,1.0572,1.0572,0,0,0,.6918-.3336"
                  />
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M49.9978,32.4214a.8149.8149,0,0,0,.6177.29,1.057,1.057,0,0,0,.6918-.3335"
                  />
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21.756,44.065a.9464.9464,0,0,0,.5492.2362.8676.8676,0,0,0,.5694-.1746"
                  />
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M48.8417,17.2263a2.0059,2.0059,0,0,1,2.8143.2827A23,23,0,0,1,16.041,46.6221a2.0059,2.0059,0,0,1,.2827-2.8143Z"
                  />
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M25,31c-.2-.6768-.7176-2.4307,0-3,.8825-.7,2.4466,1.3331,5,1"
                  />
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M32.5234,29.5145c-1.1243-3.9866-.89-5.118-.4245-5.3684.7955-.4276,2.2537,1.722,4.0192,1.3586a3.6929,3.6929,0,0,0,2.2455-2.2266"
                  />
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M48.8331,41.1249a1.0572,1.0572,0,0,0,.6918-.3336"
                  />
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M44.2406,16.3377a4.9778,4.9778,0,0,0-9.3658,1.973,3.1019,3.1019,0,0,0-3.0182-.3743A3.44,3.44,0,0,0,30.16,19.9691a4.956,4.956,0,0,0-5.7908.3421,4.8455,4.8455,0,0,0-1.3113,5.98,2.8033,2.8033,0,0,0-2.7516,1.216,3.0871,3.0871,0,0,0-.4726,2.582,4.9736,4.9736,0,0,0-4.87,3.2063A5.0971,5.0971,0,0,0,16.79,39.1643"
                  />
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19.3514,22.8631a5.2462,5.2462,0,0,0-2.7448,1.8563,4.8127,4.8127,0,0,0-.888,3.18"
                  />
                  <path
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M27.5584,16.1544a5.246,5.246,0,0,1,2.3651-2.3208,4.8124,4.8124,0,0,1,3.2929-.2378"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
        <div class="flex flex-col space-y-2">
          <div class="flex flex-col space-y-3">
            <p class="text-lg">
              You have a years supply of kebabs<sup>*</sup>
            </p>

            <p class="text-base">Come back soon to register your first!</p>
            <p class="text-sm">Bring proof of who you are, I'll be checking 🧐</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-shrink-0 m-1">
      <button @click="signOut()" class="p-2 cursor-pointer text-xs float-left border border-white rounded-sm">
        Log Out
      </button>
      <p class="text-xs float-right">
        <sup>*</sup>Based on an average of 2 pittas a week,
        <i>ingen salat</i> of course 😉
      </p>
    </div>
  </div>
  <div v-else>
    <button @click="signIn()">
      I'm going to need to see proof
    </button>

    <p class="text-sm mt-2">Are you worthy?</p>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import lottie from 'vue-lottie/src/lottie.vue'
import * as animationData from '~/assets/confetti.json'
import { gsap, Power2, Elastic, CSSRulePlugin } from 'gsap/all'

export default {
  components: {
    lottie,
  },
  data() {
    return {
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default, loop: true },
      tl: null,
      user: null,
    }
  },
  mounted() {
    this.getUser();
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
    async getUser() {
      try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        this.user = cognitoUser.signInUserSession.idToken.payload;
      } catch (error) {
        if (error === 'The user is not authenticated') {
          this.user = null;
        } else {
          console.error(error);
        }
      }
    },
    signIn() {
      Auth.federatedSignIn({ provider: 'Google' });
    },
    signOut() {
      Auth.signOut();
      this.user = null;
    }
  },
}
</script>

<style lang="scss">
button {
  background: none;
  border: none;
  color: white;
  position: relative;
  padding: 0.5em 1em;
  font-weight: bold;
  font-size: 2em;
  text-align: center;
  border: 2px solid white;
  cursor: pointer;
  border-radius: 0.2em;
  outline: none;
  width: 10em;

  &:before {
    position: absolute;
    content: '';
    background: #5000bb;
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

p {
  text-align: center;
  font-weight: bold;
  clip-path: circle(0% at 50% 50%);
}

svg {
  display: none;
  stroke-dasharray: 0 103;
}

.kebab {
  animation: appear 1s, floating 3s 0.5s infinite ease-in-out;
  margin: auto;
}

@keyframes floating {
  0% {
    transform: translate(0, 0px);
  }
  50% {
    transform: translate(0, 15px);
  }
  100% {
    transform: translate(0, -0px);
  }
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>