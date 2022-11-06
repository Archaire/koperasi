const mysql = require("mysql")

const con = mysql.createConnection({
	host: "127.0.0.1", // If this not work, try below.
	// host: "localhost", 
	user: "root",
	password: "root",
	database: "user"
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
