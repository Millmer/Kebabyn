import { Auth } from 'aws-amplify';

export const state = () => ({
  isAuthenticated: false,
  user: null
});

export const mutations = {
  set(state, user) {
    state.isAuthenticated = !!user;
    state.user = user;
  }
}

export const actions = {
  async load({ commit }) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      commit('set', user);
      return user;
    } catch (error) {
      commit('set', null);
    }
  },

  async login() {
    Auth.federatedSignIn({ provider: 'Google' })
  },

  async logout({ commit }) {
    await Auth.signOut();
    commit('set', null);
  }
}