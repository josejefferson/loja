const asyncRoutes = require('@helpers/async-routes')
const getUserByToken = require('@helpers/jwt-user')
const { roles } = require('@helpers/restrictions')

const CODE401 = { error: true, code: 401, message: 'Unauthorized' }
const CODE403 = { error: true, code: 403, message: 'Forbidden' }

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
		return res.status(401).json(CODE401)
	}),

	/**
	 * Permite acesso apenas a usuários NÃO logados
	 */
	notLogged: asyncRoutes(async (req, res, next) => {
		parseToken(req)
		const user = await getUserByToken(req.token)
		if (!user) return next()
		return res.status(401).json(CODE401)
	}),

	/**
	 * Permite acesso apenas a determinados usuários com certos níveis
	 */
	role: (role) => {
		return asyncRoutes(async (req, res, next) => {
			parseToken(req)
			const user = await getUserByToken(req.token)
			if (!user) return res.status(401).json(CODE401)

			if (!Array.isArray(role)) {
				const needRoleLevel = roles.indexOf(role)
				const myRole = roles.indexOf(user.role)
				if (myRole >= needRoleLevel) return next()
			} else {
				if (role.includes(user.role)) return next()
			}
			return res.status(403).json(CODE403)
		})
	}
}