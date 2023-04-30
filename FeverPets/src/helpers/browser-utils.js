function getBrowserLanguage() {
  const userLang = navigator.language || navigator.userLanguage
  return userLang
}

function getUrlParam(param) {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get(param)
}

export default {
  getBrowserLanguage,
  getUrlParam
}