const mongoose = require('mongoose')

const options = { timestamps: true }

const schema = new mongoose.Schema({
	name: { type: String, required: true },
	address: { type: String, required: true },
	phone: String,
	whatsapp: String,
	email: { type: String },
	sendEmails: { type: Boolean, default: false },
	emailConfirmed: { type: Boolean, default: false },
	emailVerificationToken: { type: String },
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, options)

module.exports = mongoose.model('Clients', schema)