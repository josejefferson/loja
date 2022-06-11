const mongoose = require('mongoose')

const options = { timestamps: true, strict: false }

const schema = new mongoose.Schema({
	date: { type: Date, expires: 604800 }
}, options)

module.exports = mongoose.model('Log', schema)