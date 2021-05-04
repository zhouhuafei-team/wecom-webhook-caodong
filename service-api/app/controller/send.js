const Controller = require('egg').Controller

class MyController extends Controller {
  async post () {
    const { ctx, service } = this
    const { request: { body, query, headers, url, method } } = ctx
    const result = await service.send.post({ ...query, ...body, headers, url, method })
    ctx.status = result.status || 204
    ctx.body = result
  }
}

module.exports = MyController
