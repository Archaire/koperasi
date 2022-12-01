const { Country, City, State } = require("country-state-city")
const db = require("../config/db")

const memberNew = (req, res) => {
	res.render("dashboard/register", { message: 0 })
}
const memberDelete = (req, res) => {
	const id = req.params.id
	const query = `DELETE FROM user WHERE id = "${id}"`;
	db.query(query, (err, data) => {
		if (err) {
			throw err;
		} else {
			console.log("====Start Deleting====")
			console.log(req.body)
			console.log("===End Del===")
			res.redirect('/member');
		}
	});
}

const memberEdit = (req, res) => {
	// TODO: Normalize Input user
	const id = req.params.id
	const { name } = req.body

	const query = `UPDATE user SET name = "${name}" WHERE id = ${id}`;

	db.query(query, (err, results) => {
		if (err) {
			throw err;
		} else {
			console.log(req.body)
			console.log(results)
			res.redirect('/member');
		}
	});
}

const memberCreate = (req, res) => {
	const form = {
		memberid: req.body.memberid,
		name: req.body.name,
		ktp: req.body.ktp,
		gender: req.body.gender,
		occ: req.body.occupation,
		street: req.body.street,
		city: req.body.city,
		province: req.body.province,
		district: req.body.district,
	}
	console.log(req.body)
	// const ccmd = `INSERT INTO user (name , ktp_num) VALUES ("${name}", ${ktp})`
	// db.query(ccmd, (err, result) => {
	// 	if (err) throw err;
	// 	req.flash("info", `Success added ${name}`)
	// 	return res.redirect("/register")
	// })
}

// TODO: too complicated, split to small!
const memberShow = (req, res) => {
	const limitpage = 10;
	const province = State.getStatesOfCountry("ID")
	const city = State.getStatesOfCountry("ID")
	let sql = `SELECT id FROM user`;
	db.query(sql, (err, result) => {
		// TODO: CHECK IF DB IS EMPTY
		if (err) throw err;
		const resultLen = result.length
		const maxPage = Math.ceil(resultLen / limitpage);
		let page = req.query.page ? Number(req.query.page) : 1;
		if (page > maxPage) {
			res.redirect('/member?page=' + encodeURIComponent(maxPage));
		} else if (page < 1)
			res.redirect('/member?page=' + encodeURIComponent('1'));

		// LIMIT FOR SQL
		const idxlim = (page - 1) * limitpage;
		sqlimit = `SELECT
		name, id, ktp_num, occupation, street,
		DATE_FORMAT(registered_at, "%d/%m/%Y") AS registered_compact,
		CONCAT_WS(',', street, city, regency, country, zipcode) AS address,
		DATE_FORMAT(birthdate, "%d/%m/%Y") AS birthdate_fmt,
		DATE_FORMAT(registered_at, "%d/%m/%Y %H:%m:%s") AS registered_full
		FROM user ORDER BY registered_at DESC LIMIT ${idxlim},${limitpage}`;
		db.query(sqlimit, (err, result) => {
			if (err) throw err;
			let iterator = (page - 1) < 1 ? 1 : page - 1;
			let endlink = (iterator + 1) <= maxPage ? (iterator + 9) : page + (maxPage - page);
			if (endlink < page + 1) {
				iterator -= (page + 1) - maxPage
			}
			res.render('dashboard/member', { city, province, logged: req.isAuthenticated(), data: result, page, iterator, maxPage, endlink });
		})
	})

}

const validate = () => {
}

module.exports = {
	new: memberNew,
	show: memberShow,
	create: memberCreate,
	delete: memberDelete,
	edit: memberEdit
}
