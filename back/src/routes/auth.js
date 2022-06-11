const express = require('express')
const router = express.Router()
const asyncRoutes = require('@helpers/async-routes')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('@models/User')
const { Error: MongooseError } = require('mongoose')

/**
 * Efetua o login retornando o token de acesso e os dados do usuário
 */
router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		session: false,
		badRequestMessage: 'MISSING_CREDENTIALS'
	}, (err, user, info) => {
		// Erro do servidor
		if (err) return next(err)

		// Erro do cliente
		if (!user) return res.status(400).send({
			error: true,
			code: info?.message
		})

		// JSON Web Token
		const token = user.generateJWT()

		// Responde ao cliente
		res.json({
			token,
			user: {
				name: user.name,
				email: user.email,
				emailConfirmed: user.emailConfirmed,
				role: user.role,
				info: user.info
			}
		})
	})(req, res, next)
})

/**
 * Verifica se o token é válido e retorna os dados do usuário
 */
router.post('/verify', async (req, res, next) => {
	const { token } = req.body

	try {
		// Verifica se o token é válido
		const data = jwt.verify(token, process.env.JWT_SECRET)

		// Procura o usuário pelo ID
		const user = await User.findById(data.id)

		// Retorna o usuário ao cliente
		res.json(user)
	} catch (err) {
		// Erro do Mongoose
		if (err instanceof MongooseError) return next(err)

		// Token inválido
		res.status(400).json({
			error: true,
			code: 'INVALID_TOKEN'
		})
	}
})

module.exports = router