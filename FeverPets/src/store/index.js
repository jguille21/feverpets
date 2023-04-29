import { createStore } from 'vuex'
import { SET_PET_SORTING } from './mutations.js'

export default createStore({
  state: {
    currentPetListSorting: null
  },
  mutations: {
    [SET_PET_SORTING] (state, filter) {
      state.currentPetListSorting = filter
    }
  },
  actions: {},
  getters: {}
})