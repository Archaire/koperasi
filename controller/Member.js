const { Country, City, State } = require("country-state-city")

const prisma = require("../config/db")

const memberNew = (req, res) => {
	res.render("dashboard/register", { message: 0 })
}

const memberDelete = async (req, res) => {
	const id = req.params.id
	await prisma.member.delete({
		where: { id: `${id}` }
	})
	.then(res.redirect('/member'));
}

const memberEdit = (req, res) => {
	const id = req.params.id
	const { firstName, lastName } = req.body
	prisma.member.update({
		where: {
			id: `${id}`
		},
		data: {
			firstName: `${firstName}`,
			lastName: `${lastName}`
		}
	})
	.then(res.redirect('/member'));
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

const memberShow = async(req, res) => {
	// const limitpage = 10;
	// const province = State.getStatesOfCountry("ID")
	// const city = State.getStatesOfCountry("ID")
	const member = await prisma.$queryRaw
	`SELECT
	CONCAT_WS(' ', Member.firstName, Member.lastName) AS name,
	Member.memberId,
	Member.firstName,
	Member.lastName,
	Member.nik,
	Member.occupation,
	Member.telephone,
	CONCAT_WS(',', Address.street, Address.city, Address.district, Address.zipcode) AS address_fmt,
	DATE_FORMAT(Member.birthdate, "%d/%m/%Y") AS birthdate_fmt,
	DATE_FORMAT(Member.birthdate, "%Y-%m-%d") AS birthdate_fmt_strip,
	DATE_FORMAT(Member.createdAt, "%d/%m/%Y %H:%m:%s") AS createdAt_fmt
	FROM Member INNER JOIN Address ON Member.id = Address.userId
	`
	res.render("dashboard/member", { 
		data: member,
		logged: req.isAuthenticated(),
		page: 1,
		iterator: 1,
		maxPage: 1,
		endlink: 1,
	})
}

module.exports = {
	new: memberNew,
	show: memberShow,
	create: memberCreate,
	delete: memberDelete,
	edit: memberEdit
}
