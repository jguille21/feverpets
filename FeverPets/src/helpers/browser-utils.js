function getBrowserLanguage() {
  const userLang = navigator.language || navigator.userLanguage
  return userLang
}

function getUrlParam(param) {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get(param)
}

function getStorageItem(item) {
  return JSON.parse(localStorage.getItem(item))
}

function setStorageItem(item, value) {
  localStorage.setItem(item, JSON.stringify(value))
}

export default {
  getBrowserLanguage,
  getUrlParam,
  getStorageItem,
  setStorageItem
}