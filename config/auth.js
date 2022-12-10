const passport = require("passport")
const LocalStrategy = require("passport-local")

// TODO: Limit how many attempts allowed
const strategy = new LocalStrategy({ passReqToCallback: true }, (req, username, password, cb) => {
	if (username == "admin" && password == "admin") {
		return cb(null, username)
	} else {
		// FIX: Cannot use builtin flash within passport.js
		// it should be just passing a `cb(null, false, { messages: "something"})`?
		//
		return cb(null, false, req.flash("error", "Invalid username or password"))
	}
})

passport.use(strategy);

exports.protected = (req, res, next) => {
	if (!req.isAuthenticated()) {
		res.redirect("/login")
	} else {
		next()
	}
}

passport.serializeUser(function (user, cb) {
	process.nextTick(function () {
		cb(null, { username: user});
	});
});

passport.deserializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, user);
	});
});
