const state = {
  organization: []
}

const getters = {
  setOrganization(state, organization) {
    state.organization = organization.data
  }
}

const actions = {
  async getOrganizatiosList({ commit }, id) {
    try {
      const res = await this.$axios.get(`/organizations/${id}`) 
      commit('setOrganization', res.data)
    } catch (e) {
      console.log(e.response)
      throw e
    }
  }
}

const mutations = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}