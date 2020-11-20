import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'light',
    userInfo: {}
  },
  mutations: {
    changeTheme(state, theme){
      state.theme = theme
    },
    setUserInfo(state, data) {
      state.userInfo = data
    }
  },
  actions: {

  }
})
