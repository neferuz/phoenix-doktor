const state = {
  userData: null
}

const mutations = {
  setUserData(state, data) {
    state.user = data
  }
}

const actions = {
  async login({ commit }, payload) {
    try {
      const res = await this.$axios.post('/auth/login', payload)
      commit('setUserData', res)
    } catch (e) {
      console.log(e)
      throw e
    }
  },
  async register({ commit }, payload) {
    try {
      const res = await this.$axios.post('/auth/register', payload)
      commit('setUserData', res)
    } catch (e) {
      console.log(e)
      throw e
    }
  },
  async confirm({ commit }, payload) {
    
  }
}

const getters = {

}

export default {
  state,
  actions,
  mutations,
  getters
}