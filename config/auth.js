const passport = require("passport")
const LocalStrategy = require("passport-local")

passport.use(new LocalStrategy(function verify(username, password, cb) {
	if (username == "admin" && password == "admin") {
		return cb(null, username)
	} else {
		return cb(null, false)
	}
}));


const protected = () => {
}

passport.serializeUser(function(user, cb) {
	process.nextTick(function() {
		cb(null, { id: user.id, username: user.username });
	});
});

passport.deserializeUser(function(user, cb) {
	process.nextTick(function() {
		return cb(null, user);
	});
});

// TODO: Recursively auth when apply on parent EP
//  ex: `dashboard/*` (without mapping manually)
const isAuth = (req, res, next) => {
	if (req.session.userid) {
		next()
	} else {
		res.redirect("/login")
	}
}

// module.exports = {}