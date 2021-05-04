const request = require('../../utils/request')

module.exports = {
  send (options) {
    return request({
      method: 'POST',
      ...options
    })
  }
}
