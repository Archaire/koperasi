const express = require("express")
const router = express()
const db = require("./connection-db")
const memberCtrl = require("./controller/user")
const passport = require("passport")

const {} = require("./config/auth")

// TODO: Contoller

// root
router.route("/")
	.get((req,res) => {
		const session = req.session.userid
		res.render('main', {logged: session})
	})
	// .post()

router.route("/about")
	.get((req, res) => {
		const session = req.session.userid
		res.render("aboutus", { logged: session })
	})

router.route("/faq")
	.get((req, res) => {
		const session = req.session.userid
		res.render("faq", { logged: session })
	})

router.route("/contact")
	.get((req, res) => {
		res.render("contact", {logged: true})
	})

router.get("/test", (req,res) => {})

router.route("/login")
	.get((req, res) => {
		if (!req.session.userid) {
			res.render('login', { logged: false })
		} else {
			res.redirect("/dashboard")
		}
	})
	.post(passport.authenticate("local", {
		successRedirect: "/dashboard",
		failureRedirect: "/login"
	}), (req,res) => {
		console.log("POST LOGIN <PASSPORT>")
	})
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
	.get((req, res) => {
		req.session.destroy();
		res.redirect("/")
	})

router.route("/dashboard")
	.get((req, res) => {
		res.render("dashboard/index", { logged: true })
	})


// Member
router.route("/member")
	.get(memberCtrl.show)

router.route("/member/edit/:id")
	.post(memberCtrl.edit)

router.route("/member/del/:id")
	.get(memberCtrl.delete)

router.route("/register")
	.get((req,res) => {
		res.render("dashboard/register")
	})
	.post(memberCtrl.create)

// BLACK HOLE
router.route("*")
	.get((req,res) => {
		res.redirect("/")
	})

module.exports = router