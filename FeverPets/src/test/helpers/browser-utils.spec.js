import { vi } from 'vitest'
import BrowserUtils from 'helpers/browser-utils.js'

describe('BrowserUtils', () => {
  describe('getBrowserLanguage', () => {
    it('should return the browser language', function() {
      const mockLocation = 'es'
      global.navigator = { language: mockLocation }
      const browserLang = BrowserUtils.getBrowserLanguage()

      expect(browserLang).toEqual(mockLocation)
    })

    it('should return the browser user language', function() {
      const mockLocation = 'es'
      global.navigator = { language: null }
      global.navigator = { userLanguage: mockLocation }
      const browserLang = BrowserUtils.getBrowserLanguage()

      expect(browserLang).toEqual(mockLocation)
    })
  })

  describe('getUrlParam', () => {
    it('should return the value of the given URL param', function() {
      global.window = {
        location: { search: '?lang=es' }
      }
      const urlParam = BrowserUtils.getUrlParam('lang')
      expect(urlParam).toEqual('es')
    })
  })

  describe('getStorageItem', () => {
    it('should return the value of the given local storage item parsed as an object', function() {
      const mockKey = 'mockKey'
      const mockItem = '{"stuff":true, "count":100}'
      const mockStorage = {
        [mockKey]: mockItem
      }

      global.localStorage = {
        getItem: (mockKey) => {
          return mockStorage[mockKey]
        }
      }

      const item = BrowserUtils.getStorageItem(mockKey)
      expect(item).toEqual(JSON.parse(mockItem))
    })
  })

  describe('setStorageItem', () => {
    it('should set the value of the given local storage item', function() {
      const mockKey = 'mockKey'
      const mockItem = {
        stuff: true,
        count: 100
      }

      global.localStorage = {
        setItem: vi.fn()
      }

      BrowserUtils.setStorageItem(mockKey, mockItem)
      expect(global.localStorage.setItem).toHaveBeenCalledWith(mockKey, JSON.stringify(mockItem))
    })
  })
})