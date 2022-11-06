// TODO: Disable this for now. need to setup programatically.
// const db = require("./connection-db")
const router = require("./routes")
const express = require("express")
const app = express()

// TODO: save to config, dotenv ?
const hostname = "localhost"
const port = 3000

// this make sure to set with html with ejs templating. 
app.set('view engine', 'ejs');

app.use(express.static("public"))

// Bodyparser
app.use(express.urlencoded({extended: true}));

app.use(router)
app.listen(port, () => {
	console.log(`Running server on http://${hostname}:${port}`)
})
