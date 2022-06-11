const express = require('express')
const router = express.Router()
const asyncRoutes = require('@helpers/async-routes')

const Highlight = require('@models/Highlight')
const databaseRoutes = require('@routes/_database')(Highlight)

/** Rotas do banco de dados */
router.use(databaseRoutes.all)

module.exports = router