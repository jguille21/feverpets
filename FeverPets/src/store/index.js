import { createStore } from 'vuex'
import {
  SET_PET_SORTING,
  SET_PET_PAGE,
  SET_PET_OF_THE_DAY
} from './mutations.js'
import {
  LOAD_STORED_STATE,
  PERSIST_PET_OF_THE_DAY
} from './actions.js'
import {
  GET_PET_OF_THE_DAY
} from './getters.js'
import BrowserUtils from '../helpers/browser-utils.js'

export default createStore({
  state: {
    currentPetListSorting: null,
    currentPetPage: 1,
    petOfTheDay: null
  },
  mutations: {
    [SET_PET_SORTING] (state, filter) {
      state.currentPetListSorting = filter
    },
    [SET_PET_PAGE] (state, page) {
      state.currentPetPage = page
    },
    [SET_PET_OF_THE_DAY] (state, petData) {
      state.petOfTheDay = petData
    }
  },
  actions: {
    [LOAD_STORED_STATE](context) {
      context.commit(SET_PET_OF_THE_DAY, BrowserUtils.getStorageItem('petOfTheDay'))
    },
    [PERSIST_PET_OF_THE_DAY](context, pet) {
      const day = new Date().getDay()
      const petData = {
        pet,
        day
      }
      context.commit(SET_PET_OF_THE_DAY, petData)
      BrowserUtils.setStorageItem('petOfTheDay', petData)
    }
  },
  getters: {
    [GET_PET_OF_THE_DAY](state) {
      const today = new Date().getDay()
      if (state.petOfTheDay && state.petOfTheDay.day === today) {
        return state.petOfTheDay.pet
      }
      return null
    }
  }
})