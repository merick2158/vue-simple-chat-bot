import { createStore } from 'vuex'
import { ChatApp } from '@/helpers'

export default createStore({
  state: {
    wsUrl: 'ws://localhost:8080',
    userOffer: null,
    timer: 15,
    botMessages: [
      'We offer this package to multiple supplier for 9.500€. What is your bid?',
      'This is quite far from what we expected. Please enter a more improved offer.',
      'Please enter a more improved offer.',
      'Congratulation, you get the deal',
      'Hurry up, what is your offer?'
    ]
  },
  getters: {
  },
  mutations: {
    stateUpdater (state: any, payload: any) {
      state[payload.name] = payload.value
    },
  },
  actions: {
    setOffer ({ state, commit, dispatch }, payload: any) {
      commit('stateUpdater', { name: 'userOffer', value: payload })
      const offer = parseInt(payload)
      const app = new ChatApp(state.wsUrl);
      if(payload) app.sendMessage({ name: 'Bot', message: 'Thank you. Processing your offer...' });
      setTimeout(() => {
        if (offer > 10000 && offer > 9000) {
          app.sendMessage({ name: 'Bot', message: state.botMessages[0] });
          dispatch('setTimer', 15);
        } else if (offer < 10000 && offer > 3000) {
          app.sendMessage({ name: 'Bot', message: state.botMessages[1] });
          dispatch('setTimer', 15);
        } else if (offer < 3000) {
          app.sendMessage({ name: 'Bot', message: state.botMessages[3] });
        } else if (!payload) {
          app.sendMessage({ name: 'Bot', message: state.botMessages[4] });
          dispatch('setTimer', 15);
        } else {
          app.sendMessage({ name: 'Bot', message: state.botMessages[2] });
          dispatch('setTimer', 15);
        }
      }, 2000)
    },
    setTimer ({ commit }, payload: any) {
      commit('stateUpdater', { name: 'timer', value: payload })
    }
  },
  modules: {
  }
})
