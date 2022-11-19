const state = {
  doctors: []
}

const getters = {
  setDoctors(state, doctors) {
    state.doctors = doctors.data
  }
}

const actions = {
  async getDoctorsList({ commit }, id) {
    try {
      const res = await this.$axios.get(`/doctors/${id}`) 
      commit('setDoctors', res.data)
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