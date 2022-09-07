const routes = require('express').Router()
const {
    pushNotificationToTopic,
  pushNotificationToSpecificDevice,
} = require('../controllers/index')

routes.post('/push-notification', pushNotificationToTopic)
routes.post('/push-notification-to-devices', pushNotificationToSpecificDevice)

module.exports = routes
