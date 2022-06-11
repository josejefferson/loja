const express = require('express')
const router = express.Router()
const asyncRoutes = require('@helpers/async-routes')
const restrictions = require('@routes/_restrictions')

const User = require('@models/User')
const databaseRoutes = require('@routes/_database')(User)

/** Rotas do banco de dados */
router.use(databaseRoutes.all)

module.exports = router