const express = require('express')
const router = express.Router()
const asyncRoutes = require('@helpers/async-routes')
const restrictions = require('@routes/_restrictions')

const Ad = require('@models/Ad')
const databaseRoutes = require('@routes/_database')(Ad)

/** Rotas do banco de dados */
router.use(restrictions.role('owner'), databaseRoutes.all)

module.exports = router