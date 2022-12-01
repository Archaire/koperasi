const db = require("../config/db")

const dashboardIndex = (req,res) => {
	console.log('/dashboard'+req.isAuthenticated())
	res.render("dashboard/index", {logged: req.isAuthenticated()})
}

module.exports = {
	index: dashboardIndex,
}
