const express = require('express')
const router = express.Router()
const asyncRoutes = require('@helpers/async-routes')
const restrictions = require('@routes/_restrictions')

const Log = require('@models/Log')
const databaseRoutes = require('@routes/_database')(Log)

/** Rotas do banco de dados */
router.use(databaseRoutes.all)

module.exports = router