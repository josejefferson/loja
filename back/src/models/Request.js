const mongoose = require('mongoose')

const options = { timestamps: true }

const schema = new mongoose.Schema({
	clientId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Clients',
		required: true
	},
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Products',
		required: true
	},
	quantity: { type: Number, default: 1 },
	other: String,
	date: { type: Date, default: Date.now },
	status: { type: String, enum: ['pending', 'confirmed', 'rejected', 'canceled'], default: 'pending' },
	open: { type: Boolean, default: true },
	feedback: String,
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, options)

module.exports = mongoose.model('Requests', schema)