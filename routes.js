const express = require("express")
const router = express()
// TODO: Contoller


// Chainable like this much better i guess.
router.route("/")
	.get((req,res) => {
		res.render('main')
	})
	// .post()

// than this 
router.get("/about", (req,res) =>{
	res.render("aboutus")
})

router.post("/add", (req,res) => {
	console.log(req.body);
	console.log("Take me home");
	res.redirect("/");
})

router.get("/register", (req,res) => {
	res.send('This is register')
})

router.get("/test", (req,res) => {
	res.render("test")
	console.log('This is test')
})

router.get("/login", (req,res) => {
	res.render('login')
})

module.exports = router
