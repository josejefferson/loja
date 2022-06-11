const mongoose = require('mongoose')

const options = { timestamps: true }

const schema = new mongoose.Schema({
	data: { type: Buffer, required: true },
	contentType: { type: String, required: true },
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, options)

module.exports = mongoose.model('Images', schema)