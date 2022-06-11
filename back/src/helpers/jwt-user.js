const jwt = require('jsonwebtoken')
const { Error: MongooseError } = require('mongoose')
const User = require('@models/User')

async function getUserByToken(token) {
	try {
		// Verifica se o token é válido
		const data = jwt.verify(token, process.env.JWT_SECRET)

		// Procura o usuário pelo ID
		const user = await User.findById(data.id)

		// Retorna o usuário ou null
		return user
	} catch (err) {
		// Erro do Mongoose
		if (err instanceof MongooseError) throw err

		// Token inválido
		return false
	}
}

module.exports = getUserByToken