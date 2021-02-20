export const state = () => ({
  kebabs: [],
})

export const mutations = {
  register(state, text) {
    state.kebabs.push({
      text,
      done: false,
    })
  },
}
