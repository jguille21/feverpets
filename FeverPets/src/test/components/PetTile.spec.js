import { vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PetTile from 'components/PetTile.vue'

describe('PetTile', () => {
  let wrapper
  const mockPetData = {
    id: 1,
    photo_url: ''
  }

  beforeEach(() => {
    const propsData = {
      petData: mockPetData
    }
    wrapper = mount(PetTile, {
      propsData,
      global: {
        mocks: {
          $t: vi.fn()
        }
      }
    })
  })

  it('should toggle the hover data property when prompted to', function() {
    wrapper.vm.isHovered = false
    wrapper.vm.toggleHover()
    expect(wrapper.vm.isHovered).toEqual(true)
    wrapper.vm.toggleHover()
    expect(wrapper.vm.isHovered).toEqual(false)
  })
})