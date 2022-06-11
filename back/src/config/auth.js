const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('@models/User')

passport.use(new LocalStrategy({
	usernameField: 'login',
	passwordField: 'password'
}, (login, password, done) => {
	User.findOne({ email: login }).select('+password').then((user) => {
		if (!user || !user.validatePassword(password)) {
			return done(null, false, { message: 'INVALID_CREDENTIALS' })
		}

		return done(null, user)
	}).catch(done)
}))