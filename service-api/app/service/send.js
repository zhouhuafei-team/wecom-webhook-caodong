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
      const token = (req.header || req.headers).token || ''
      if (token) {
        // token存在但是token过期了则return。
        const permissionRes = await axios({
          url: permissionApi,
          headers: { token }
        })
        if (permissionRes.data.status === 401) {
          return {}
        }
      } else {
        // token不存在且req.url不在白名单中则return。
        // 白名单中应包含pc管理系统中的当前用户所属租户列表接口，登录接口，验证码接口。
        // 白名单中应包含mp客户端中的登录接口。
        // 此处仅做文案记录并不打算进行开发。
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
