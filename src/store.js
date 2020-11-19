import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'light'
  },
  mutations: {
    changeTheme(state, theme){
      state.theme = theme
    }
  },
  actions: {

  }
})
