const request = require('../../utils/request')

module.exports = {
  we (data) {
    return request({
      url: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send',
      data
    })
  }
}
