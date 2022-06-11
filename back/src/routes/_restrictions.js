const asyncRoutes = require('@helpers/async-routes')
const getUserByToken = require('@helpers/jwt-user')

const CODE401 = { error: true, code: 401, message: 'Unauthorized' }

const parseToken = (req) => {
	if (!req.headers.authorization) return
	const [type, token] = req.headers.authorization.split(' ')
	if (type.toLowerCase() !== 'token') return
	if (!token) return
	req.token = token
}

module.exports = {
	/**
	 * Permite acesso apenas a usuários logados
	 */
	logged: asyncRoutes(async (req, res, next) => {
		parseToken(req)
		const user = await getUserByToken(req.token)
		if (user) return next()
		return res.json(CODE401)
	}),

	/**
	 * Permite acesso apenas a usuários NÃO logados
	 */
	notLogged: asyncRoutes(async (req, res, next) => {
		parseToken(req)
		const user = await getUserByToken(req.token)
		if (!user) return next()
		return res.json(CODE401)
	})
}