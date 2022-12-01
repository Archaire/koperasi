const router = require("express")()
const db = require("./db")
const { protected } = require("./auth")
const passport = require("passport")

// Controller
const memberCtrl = require("../controller/Member")

router.route("/")
	.get((req, res) => {
		res.render('main', { logged: req.isAuthenticated() })
	})

router.route("/about")
	.get((req, res) => {
		res.render("about", { logged: req.isAuthenticated() })
	})

router.route("/faq")
	.get((req, res) => {
		res.render("faq", { logged: req.isAuthenticated() })
	})


router.route("/login")
	.get((req, res) => {
		if (req.isAuthenticated()) {
			res.redirect("/dashboard")
		} else {
			res.render("login", { logged: req.isAuthenticated() })
		}
	})
	.post(passport.authenticate("local", {
		failureRedirect: "/login",
		successRedirect: "/dashboard"
	}))

router.route("/logout")
	.get((req, res) => {
		req.logout((err) => {
			if (err) throw err
			res.redirect("/")
		});
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
	.get(protected, (req, res) => {
		res.render("dashboard/register", { logged: req.isAuthenticated() })
	})
	.post(protected, memberCtrl.create)

// BLACK HOLE
router.route("*")
	.get((req, res) => {
		res.redirect("/")
	})


module.exports = router
