export default {
    install: (app, options) => {
      app.config.globalProperties.$t = (key, param) => {
        return key.split('.').reduce((o, i) => {
          if (o) {
            if (typeof o[i] === 'string') {
              return o[i].replace('{1}', param)
            } else { 
              return o[i]
            }
          }
        }, options)
      }
    }
  }