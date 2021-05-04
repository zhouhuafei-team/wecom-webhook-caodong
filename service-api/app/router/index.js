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

  // send
  router.post(path + '/send', sign, controller.send.post)
}
