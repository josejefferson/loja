const express = require('express')
const router = express.Router()
const asyncRoutes = require('@helpers/async-routes')
const restrictions = require('@routes/_restrictions')

const Notification = require('@models/Notification')
const databaseRoutes = require('@routes/_database')(Notification)

/** Rotas do banco de dados */
router.use(databaseRoutes.all)

module.exports = router