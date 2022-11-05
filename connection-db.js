const mysql = require("mysql")

const con = mysql.createConnection({
	host: "127.0.0.1", // If this not work, try below.
	// host: "localhost", 
	user: "root",
	password: "root",
	database: "koperasi"
});

// TODO: 
// TODO: How Generated random data once! (test)

con.connect((err) => {
	if (err) throw err;
	con.query("CREATE DATABASE IF NOT EXISTS koperasi");
	console.log("mysql: Connected! No data yet! :)")
})

module.exports = con;
