const Service = require('egg').Service
const sysConfig = require('../../../sys.config')
const apiWe = require('../api/we')

class MyService extends Service {
  async post (data) {
    let { headers, url, method, ...reqData } = data
    console.log('++++++++++++url', url)
    console.log('++++++++++++method', method)
    console.log('++++++++++++reqData', reqData)
    // const key = '307d64f3-3ff4-44f1-aba2-0f21f516e9dc'
    // const res = await apiWe.we({
    //   'msgtype': 'text',
    //   'text': {
    //     'content': '广州今日天气：29度，大部分多云，降雨概率：60%',
    //     'mentioned_list': ['wangqing', '@all'],
    //     'mentioned_mobile_list': ['13800001111', '@all']
    //   }
    // }, key)
    // console.log('++++++++++++res', res)
    return {
      status: 204,
      result: {}
    }
  }
}

module.exports = MyService
