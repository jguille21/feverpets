import { vi } from 'vitest'
import Vuex from 'vuex'
import { mount } from '@vue/test-utils'
import ApiPets from 'services/api-pets.js'
import PetsList from 'components/PetsList.vue'
import { SET_PET_SORTING, SET_PET_PAGE } from 'store/mutations.js'

describe('PetsList', () => {
  let wrapper
  const mockSorting = 'mockSorting'
  const mockCurrentPage = 1
  const mockStore = new Vuex.Store({
    state: {
      currentPetListSorting: mockSorting,
      currentPetPage: mockCurrentPage
    },
    mutations: {
      [SET_PET_SORTING]: vi.fn(),
      [SET_PET_PAGE]: vi.fn()
    }
  })
  
  describe('created', () => {
    const changePageMock = vi.spyOn(PetsList.methods, 'changePage')
    const changeSortingMock = vi.spyOn(PetsList.methods, 'changeSorting')
    const mockPetData = {
      id: 1,
      photo_url: ''
    }
    const propsData = {
      petData: mockPetData
    }
    wrapper = mount(PetsList, {
      propsData,
      global: {
        mocks: {
          $store: mockStore,
          $t: vi.fn()
        }
      }
    })

    it('should call changePage and changeSorting on creatd hook if the related properties are available', function() {
      expect(changePageMock).toHaveBeenCalled()
      expect(changeSortingMock).toHaveBeenCalled()
    })
  })

  describe('methods', () => {
    const mockPetData = { id: 1 }
    const mockApiResponse = {
      data: mockPetData,
      headers: { ['x-total-count']: 30 }
    }
    const response = new Response(mockApiResponse)

    beforeEach(() => {
      ApiPets.getPetsPaginatedAndSorted = vi.fn().mockResolvedValue(response)

      const propsData = {
        petData: mockPetData
      }

      wrapper = mount(PetsList, {
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

      wrapper.vm.setPetSorting = vi.fn()
      wrapper.vm.setPetPage = vi.fn()
    })

    it('should set pets data to null and change the current sorting when prompted to', function() {
      const mockNewSorting = { sortBy: 'sortBy', order: 'order' }
      wrapper.vm.changeSorting(mockNewSorting)
      expect(wrapper.vm.pets).toEqual(null)
      expect(wrapper.vm.currentPetListSorting).toEqual(mockNewSorting)
      expect(wrapper.vm.setPetSorting).toHaveBeenCalledWith(mockNewSorting)
    })

    it('should set pets data to null and change the current page when prompted to', function() {
      const mockNewPage = 12
      wrapper.vm.changePage(mockNewPage)
      expect(wrapper.vm.pets).toEqual(null)
      expect(wrapper.vm.currentPage).toEqual(mockNewPage)
      expect(wrapper.vm.setPetPage).toHaveBeenCalledWith(mockNewPage)
    })

    it('should navigate to the given pet page when prompted to', function() {
      const mockPetId = 2
      const mockExpectedParams = {
        name: 'pet',
        params: {
          id: mockPetId
        }
      }
      wrapper.vm.navigateToPetPage(mockPetId)
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith(mockExpectedParams)
    })

    it('should retrieve the pets data when prompted to', async function() {
      const mockSorting = { sortBy: 'sortBy', order: 'order' }
      wrapper.vm.currentPetListSorting = mockSorting
      wrapper.vm.setNewImageForSpinner = vi.fn()
      wrapper.vm.retrievePetsFromApi()
      await new Promise(resolve => setTimeout(() => {
        expect(wrapper.vm.pets).toEqual(response.data)
        resolve()
      }, 1000))
    })

    it('should set a new spinner image when prompted to', function() {
      const mockTheOnlyImage = 'mockTheOnlyImage'
      wrapper.vm.spinnerImages = [mockTheOnlyImage]
      wrapper.vm.setNewImageForSpinner()
      expect(wrapper.vm.spinnerImage).toEqual(mockTheOnlyImage)
    })
  })
})