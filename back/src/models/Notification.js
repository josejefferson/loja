const mongoose = require('mongoose')

const options = { timestamps: true }

const schema = new mongoose.Schema({
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Clients',
		required: true
	},
	title: String,
	message: String,
	url: String,
	image: String,
	icon: String,
	color: String,
	read: { type: Boolean, default: false }
}, options)

module.exports = mongoose.model('Notifications', schema)