const mongoose = require('mongoose')

const options = { timestamps: true }

const schema = new mongoose.Schema({
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, options)

module.exports = mongoose.model('Highlights', schema)