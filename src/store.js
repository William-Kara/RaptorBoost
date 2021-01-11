import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      isLogged: false,
      data: null
    }
  },
  mutations: {
    SET_CURRENT_USER(state, user) {
      state.user.data = user
    },
    SET_LOGGED_IN(state, loggedIn) {
      state.user.isLogged = loggedIn
    }
  },
  getters: {
    getCurrentUser: (state) => {
      return state.user
    }
  },
  actions: {
    setCurrentUser: ( { commit } , user) => {
      commit("SET_LOGGED_IN", user !== null)
      if (user) {
        commit("SET_CURRENT_USER", {
          displayName: user.displayName,
          email: user.email
        })
      } else {
        commit("SET_CURRENT_USER", null)
      }
    }
  }
})

export {
  store
}