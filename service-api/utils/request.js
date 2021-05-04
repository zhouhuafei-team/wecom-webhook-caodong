const axios = require('axios')

module.exports = function (options = {}) {
  options.data = options.data || options.params || {}
  options.method = options.method || 'GET'
  if (options.method.toUpperCase() === 'GET') {
    options.params = options.data
  }
  return axios({
    ...options,
    params: options.params,
    data: options.data,
    url: options.url
  }).then((res) => {
    return res.data
  }).catch((Error) => {
    console.error('打印Error：↓\n', Error)
    console.error('打印Error.message：↓\n', Error.message)
    console.error('打印Error.response：↓\n', Error.response)
    const { data = {}, status } = Error.response || {}
    return Promise.reject(data || Error)
  })
}
