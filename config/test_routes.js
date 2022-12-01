const testroute = require("express")()
const db = require("./db")
const { protected } = require("./auth")

testroute.get("/test", (req, res) => {
	db.query("SELECT * FROM user", (err, result) => {
		if (err) throw err;
		res.send(result);
	});
	console.log("from /test route")
})

module.exports = testroute
