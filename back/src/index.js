console.clear()
require('dotenv/config')
process.env.JWT_SECRET ||= 'a69d26bb4b00b656e29f16199bd6eff5'
require('module-alias/register')
require('@config/database')
require('@config/auth')
const express = require('express')
const log = require('@logger')
const app = express()

app.set('trust proxy', true)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/** Routes */
app.use('/ads', require('@routes/ads'))
app.use('/auth', require('@routes/auth'))
app.use('/highlights', require('@routes/highlights'))
app.use('/images', require('@routes/images'))
app.use('/logs', require('@routes/logs'))
app.use('/notifications', require('@routes/notifications'))
app.use('/products', require('@routes/products'))
app.use('/requests', require('@routes/requests'))
app.use('/users', require('@routes/users'))

/** 404 */
app.use((req, res) => {
	if (res.headersSent) return
	res.status(404).send({ error: true, code: 404, message: 'Not found' })
})

/** 500 */
app.use((err, req, res, next) => {
	if (res.headersSent) return
	log('Erro').error(err)

	const error = {
		error: true,
		code: 500
	}

	if (process.env.NODE_ENV === 'development') {
		error.message = err.message
		error.details = err
	}

	res.status(500).send(error)
})

/** Open server */
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	log('HTTP').success(`Servidor rodando na porta ${PORT}`)
})

module.exports = app