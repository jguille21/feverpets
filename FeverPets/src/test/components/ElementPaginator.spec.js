import { mount } from '@vue/test-utils'
import ElementPaginator from 'components/ElementPaginator.vue'

describe('ElementPaginator', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(ElementPaginator)
  })

  it('should emit the desired page to go to when prompted', async function() {
    const mockPageNumber = 7
    wrapper.vm.changePage(mockPageNumber)
    expect(wrapper.emitted().changePage).toBeTruthy()
    expect(wrapper.emitted().changePage[0]).toEqual([mockPageNumber])
  })
})