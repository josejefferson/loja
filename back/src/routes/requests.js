const express = require('express')
const router = express.Router()
const asyncRoutes = require('@helpers/async-routes')

const Request = require('@models/Request')
const databaseRoutes = require('@routes/_database')(Request)

/** Rotas do banco de dados */
router.use(databaseRoutes.all)

module.exports = router