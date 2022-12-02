// TODO: Disable this for now. need to setup programatically.
const router = require("./config/routes")
const express = require("express")
const app = express()
const passport = require("passport")

const session = require("express-session")
require("./config/env")

// TODO: save to config, dotenv ?
const hostname = process.env.APP_HOST
const port = process.env.PORT || 3000

// this make sure to set with html with ejs templating. 
app.set('view engine', 'ejs');

app.use(express.static("public"))

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(session({
	secret: process.env.SESSION_KEY,
	resave: false,
	saveUninitialized: true,
}));

// Auth (passportJS)
require("./config/auth")
app.use(passport.initialize())
app.use(passport.session())

if (process.env.TESTING) {
	const testroute = require("./config/test_routes")
	app.use(testroute)
}
require("./config/gen")
app.use(router)

app.listen(port, () => {
	console.log(`Running server on http://${hostname}:${port}`)
})
