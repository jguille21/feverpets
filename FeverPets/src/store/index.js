import { createStore } from 'vuex'
import { SET_PET_SORTING, SET_PET_PAGE } from './mutations.js'

export default createStore({
  state: {
    currentPetListSorting: null,
    currentPetPage: 1
  },
  mutations: {
    [SET_PET_SORTING] (state, filter) {
      state.currentPetListSorting = filter
    },
    [SET_PET_PAGE] (state, page) {
      state.currentPetPage = page
    }
  },
  actions: {},
  getters: {}
})