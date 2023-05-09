import { vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ApiPets from 'services/api-pets.js'
import PetDetail from 'components/PetDetail.vue'


describe('PetDetail', () => {
  let wrapper
  const mockPetId = 1
  const mockPetData = {
    id: mockPetId,
    photo_url: ''
  }
  const mockApiResponse = {
    data: mockPetData
  }

  beforeEach(() => {
    ApiPets.getPetById = vi.fn().mockResolvedValue(mockApiResponse)
    const mockRoute = {
      params: {
        id: mockPetId
      }
    }
    const propsData = { enabled: true }
    wrapper = mount(PetDetail, {
      propsData,
      global: {
        mocks: {
          $route: mockRoute,
          $t: vi.fn()
        }
      }
    })
  })

  it('should call the API to load a given pet data when mounted', function() {
    expect(ApiPets.getPetById).toHaveBeenCalledWith(mockPetId)
  })

  it('should assign the API returned data as the petData', function() {
    expect(wrapper.vm.petData).toEqual(mockPetData)
  })
})