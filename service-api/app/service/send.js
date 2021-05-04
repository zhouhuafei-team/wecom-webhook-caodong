const Service = require('egg').Service
const sysConfig = require('../../../sys.config')
const apiSend = require('../api/send')
const axios = require('axios')

class MyService extends Service {
  async post (data) {
    let { headers, url, method, ...reqData } = data
    let { type, req, res } = reqData
    try {
      let [project, env, item] = type.split('.')
      let { permissionApi, webHookUrl, name } = sysConfig[project][env][item]
      const permissionRes = await axios({
        url: permissionApi,
        headers: { token: (req.header || req.headers).token || '' }
      })
      if (permissionRes.data.status === 401) {
        return {}
      }
      await apiSend.send({
        url: webHookUrl,
        data: {
          msgtype: 'text',
          text: {
            content: `${name}\n请求主体信息\n${JSON.stringify(req, null, 2)}\n响应主体信息\n${JSON.stringify(res, null, 2)}`
          }
        }
      })
    } catch (error) {
      console.log('service send.js post error', error)
    }
    return {
      status: 204,
      result: {}
    }
  }
}

module.exports = MyService
