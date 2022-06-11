const express = require('express')
const router = express.Router()
const asyncRoutes = require('@helpers/async-routes')

const Ad = require('@models/Ad')
const databaseRoutes = require('@routes/_database')(Ad)

/** Rotas do banco de dados */
router.use(databaseRoutes.all)

module.exports = router