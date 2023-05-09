import { vi } from 'vitest'
import Vuex from 'vuex'
import { mount } from '@vue/test-utils'
import ApiPets from 'services/api-pets.js'
import PetOfTheDay from 'components/PetOfTheDay.vue'
import { GET_PET_OF_THE_DAY } from 'store/getters.js'

describe('PetOfTheDay', () => {
  let wrapper
  const mockPetId = 1
  const mockPetData = {
    id: mockPetId,
    photo_url: ''
  }
  const mockApiResponse = [{
    data: mockPetData
  }]

  const mockStore = new Vuex.Store({
    getters: {
      [GET_PET_OF_THE_DAY]: () => mockPetData
    },
  })

  beforeEach(() => {
    ApiPets.getAllPets = vi.fn().mockResolvedValue(mockApiResponse)
    const propsData = { enabled: true }
    wrapper = mount(PetOfTheDay, {
      propsData,
      global: {
        mocks: {
          $router: {
            push: vi.fn()
          },
          $store: mockStore,
          $t: vi.fn()
        }
      }
    })
  })

  it('should retrieve pet of the day when mounted', function() {
    expect(wrapper.vm.petOfTheDay).toEqual(mockPetData)
  })

  it('should call the API to retrieve all the pets data when mounted', function() {
    expect(ApiPets.getAllPets).toHaveBeenCalled()
  })

  it('should redirect to the pet of the day page when promted to', function() {
    const mockExpectedParams = {
      name: 'pet',
      params: {
        id: mockPetData.id
      }
    }
    wrapper.vm.petOfTheDay = mockPetData
    wrapper.vm.showPetOfTheDay()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(mockExpectedParams)
  })

  it('should get the pet of the day if there\'s none before redirecting to the pet of the day page when promted to', function() {
    wrapper.vm.petOfTheDay = null
    wrapper.vm.getNewPetOfTheDay = vi.fn().mockImplementation(() => {
      wrapper.vm.petOfTheDay = mockPetData
    })
    wrapper.vm.showPetOfTheDay()
    expect(wrapper.vm.getNewPetOfTheDay).toHaveBeenCalled()
  })

  it('should persist new pet of the day data after retrieving it', function() {
    const mockTheOnlyPet = 'mockTheOnlyPet'
    wrapper.vm.persistPetOfTheDay = vi.fn()
    wrapper.vm.pets = [mockTheOnlyPet]
    wrapper.vm.getNewPetOfTheDay()
    expect(wrapper.vm.petOfTheDay).toEqual(mockTheOnlyPet)
    expect(wrapper.vm.persistPetOfTheDay).toHaveBeenCalledWith(wrapper.vm.petOfTheDay)
  })
})