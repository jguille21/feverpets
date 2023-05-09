import { mount } from '@vue/test-utils'
import ElementSorter from 'components/ElementSorter.vue'

const SORT_ORDERS = {
  ASC: 'asc',
  DESC: 'desc'
}

describe('ElementSorter', () => {
  let wrapper
  beforeEach(() => {
    const propsData = { enabled: true }
    wrapper = mount(ElementSorter, { propsData })
  })

  it('should assign and emit the desired sorting to apply when prompted', async function() {
    const mockSortingType = 'mockSorting'
    const mockSorting = {
      order: SORT_ORDERS.ASC,
      sortBy: mockSortingType
    }
    wrapper.vm.changeSorting(mockSortingType)
    expect(wrapper.vm.currentSorting).toEqual(mockSortingType)
    expect(wrapper.emitted().changeSorting).toBeTruthy()
    expect(wrapper.emitted().changeSorting[0]).toEqual([mockSorting])
  })

  it('should clear sorting values and emit when prompted', async function() {
    const mockSorting = {
      order: SORT_ORDERS.ASC,
      sortBy: null
    }
    wrapper.vm.clearSorting()
    expect(wrapper.vm.sortingOrder).toEqual(SORT_ORDERS.ASC)
    expect(wrapper.vm.currentSorting).toEqual(null)
    expect(wrapper.emitted().changeSorting).toBeTruthy()
    expect(wrapper.emitted().changeSorting[0]).toEqual([mockSorting])
  })

  it('should return the current sorting as class for a param if the given param is the current one to be sorted by', function() {
    const mockParam = 'mockParam'
    const mockSorting = 'mockSorting'
    wrapper.vm.currentSorting = mockParam
    wrapper.vm.sortingOrder = mockSorting
    const paramClass = wrapper.vm.getParamClass(mockParam)
    expect(paramClass).toEqual(mockSorting)
  })

  it('should not return the current sorting as class for a param if the given param is the current one to be sorted by', function() {
    const mockParam = 'mockParam'
    const mockSorting = 'mockSorting'
    wrapper.vm.currentSorting = 'notMockParam'
    wrapper.vm.sortingOrder = mockSorting
    const paramClass = wrapper.vm.getParamClass(mockParam)
    expect(paramClass).not.toEqual(mockSorting)
  })

  it('should return the disabled class for a param if component has been told via prop to not be enabled', function() {
    const propsData = { enabled: false }
    wrapper = mount(ElementSorter, { propsData })
  
    const mockParam = 'mockParam'
    const mockSorting = 'mockSorting'
    wrapper.vm.currentSorting = 'notMockParam'
    wrapper.vm.sortingOrder = mockSorting
    const paramClass = wrapper.vm.getParamClass(mockParam)
    expect(paramClass).toEqual(' disabled')
  })
})