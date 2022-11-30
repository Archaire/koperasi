const mysql = require("mysql")
const dotenv = require("dotenv").config()

const con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});

// TODO: I'm not sure how to setup this!
// 	- How to test this with the same data on all machine? can we move around db? backup and import probably?
//
// TODO: How Generated random data once! (test)
con.connect((err) => {
	if (err) throw err;
	// con.query("CREATE DATABASE IF NOT EXISTS koperasi");
	console.log("mysql: Connected! No data yet! :)")
})

module.exports = con;
