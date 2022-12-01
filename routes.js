const router = require("express")()

// Controller
const memberCtrl = require("./controller/user")
const passport = require("passport")
const { protected } = require("./config/auth")

// root
router.route("/")
	.get((req,res) => {
		res.render('main', { logged: req.isAuthenticated()})
	})
	// .post()

router.route("/about")
	.get((req, res) => {
		const session = req.session.userid
		res.render("aboutus", { logged: req.isAuthenticated()})
	})

router.route("/faq")
	.get((req, res) => {
		const session = req.session.userid
		res.render("faq", { logged: req.isAuthenticated() })
	})

router.route("/contact")
	.get((req, res) => {
		res.render("contact", {logged: req.isAuthenticated()})
	})

router.get("/test", (req,res) => {})

function hello(req,res,next) {
	console.log("HEHE")
	next()
}

router.route("/login")
	.get((req, res) => {
		if (req.isAuthenticated()) {
			res.redirect("/dashboard")
		} else {
			res.render("login", {logged: req.isAuthenticated()})
		}
	})
	.post(passport.authenticate("local", {
		failureRedirect: "/login",
		successRedirect: "/dashboard"
	}), hello)
	// .post((req, res) => {
	// 	const { username, pass } = req.body
	// 	if (username == "admin" && pass == "admin") {
	// 		req.session.userid = req.body.username;
	// 		res.redirect("/dashboard")
	// 	} else {
	// 		// Show alert! express-flash?
	// 		res.send("Account inccorect");
	// 	}
	// })

router.route("/logout")
	.post((req, res, next) => {
		req.logout()
		// req.session.destroy();
		res.redirect("/")
	})

router.route("/dashboard")
	.get(protected, (req, res) => {
		res.render("dashboard/index", { logged: req.isAuthenticated() })
	})


// Member
router.route("/member")
	.get(protected, memberCtrl.show)

router.route("/member/edit/:id")
	.post(protected, memberCtrl.edit)

router.route("/member/del/:id")
	.get(protected, memberCtrl.delete)

router.route("/register")
	.get(protected, (req,res) => {
		res.render("dashboard/register", {logged: req.isAuthenticated()})
	})
	.post(protected, memberCtrl.create)

// BLACK HOLE
router.route("*")
	.get((req,res) => {
		res.redirect("/")
	})

module.exports = router
