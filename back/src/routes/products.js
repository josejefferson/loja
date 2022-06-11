const express = require('express')
const router = express.Router()
const asyncRoutes = require('@helpers/async-routes')

const Product = require('@models/Product')
const databaseRoutes = require('@routes/_database')(Product)

/** Rotas do banco de dados */
router.use(databaseRoutes.all)

module.exports = router