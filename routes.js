const express = require("express")
const router = express()
// const db = require("./connection-db")
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
	res.render("dashboard/register")
})

router.get("/test", (req,res) => {
	db.query("SELECT * FROM user", (err, result) => {
		if (err) throw err;
		res.send(result);
	});
	// res.render("test")
	// console.log('This is test')
})

router.get("/login", (req,res) => {
	res.render('login')
	// Validate ???
	// res.redirect("/dasboard")
})

//  Only if valid account, included dashboard/* (need to be authenticated)
router.get("/dashboard", (req,res) => {
	res.render("dashboard/index")
})

const limitpage = 10;
// Test
router.get("/member", (req, res) => {
	let sql = `SELECT * FROM user`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		const resultLen = result.length;
		const maxPage = Math.ceil(resultLen / limitpage);
		let page = req.query.page ? Number(req.query.page) : 1;
		console.log(`Page: ${page}, pagesnum: ${maxPage}, len ${resultLen}`);
		if (page > maxPage) {
			res.redirect('/member?page='+encodeURIComponent(maxPage));
		} else if (page < 1 )
			res.redirect('/member?page='+encodeURIComponent('1'));

		// LIMIT FOR SQL
		const idxlim = (page - 1) * limitpage;
		sqlimit = `SELECT * FROM user LIMIT ${idxlim},${limitpage}`;
		console.log(`idxlimit: ${idxlim}, ${limitpage}`)
		db.query(sqlimit, (err, result) => {
			if (err) throw err;
			let iterator = (page - 1) < 1 ? 1 : page - 1;
			let endlink = (iterator + 1) <= maxPage ? (iterator + 9) : page + (maxPage - page);
			if (endlink < page + 1) {
				iterator -= (page + 1) - maxPage
			}
			res.render('dashboard/member', { data: result, page, iterator, maxPage, endlink });
			result.forEach(element => {
				console.log(element.name);
			});
		})
	})
})

module.exports = router
