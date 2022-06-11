const express = require('express')
const router = express.Router()
const asyncRoutes = require('@helpers/async-routes')

const Client = require('@models/Client')
const databaseRoutes = require('@routes/_database')(Client)

/** Rotas do banco de dados */
router.use(databaseRoutes.all)

module.exports = router