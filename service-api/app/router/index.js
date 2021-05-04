'use strict'

const sign = require('./sign')

const path = `/wecom-webhook-caodong/api`

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app

  // hello world
  router.get(path + '/', controller.hello.get)

  // we
  router.get(path + '/we', controller.we.post) // 删除。待续....
  // router.post(path + '/we', sign, controller.we.post) // 放开。待续....
}
