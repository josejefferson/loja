const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const options = { timestamps: true }

const schema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	emailConfirmed: { type: Boolean, default: false, select: false },
	emailVerificationToken: { type: String, select: false },
	password: { type: String, required: true, select: false },
	permissions: { type: Array, default: [] },
	role: { type: String, default: 'client', enum: ['client', 'manager', 'owner', 'admin'] },
	info: { type: Object, default: {} },
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, options)

/** Valida a senha */
schema.methods.validatePassword = function (password) {
	return this.password === password
}

/** Gera o token JWT */
schema.methods.generateJWT = function () {
	const today = new Date()
	const expirationDate = new Date(today)
	expirationDate.setDate(today.getDate() + 60)

	return jwt.sign({
		id: this._id,
		exp: parseInt(expirationDate.getTime() / 1000)
	}, process.env.JWT_SECRET)
}

module.exports = mongoose.model('User', schema)