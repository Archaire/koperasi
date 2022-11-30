const db = require("../connection-db")

function memberShow (req,res) {
  const limitpage = 2;
  let sql = `SELECT name, id, ktp_num FROM user`;
  db.query(sql, (err, result) => {
    // TODO: CHECK IF DB IS EMPTY
    if (err) throw err;
    const resultLen = result.length;
    // console.log(` LELELLEEN: ${resultLen}`);
    console.log(result);
    const maxPage = Math.ceil(resultLen / limitpage);
    let page = req.query.page ? Number(req.query.page) : 1;
    // console.log(`Page: ${page}, pagesnum: ${maxPage} len ${resultLen}`);
    if (page > maxPage) {
      res.redirect("/member?page=" + encodeURIComponent(maxPage));
    } else if (page < 1)
      res.redirect("/member?page=" + encodeURIComponent("1"));

    // LIMIT FOR SQL
    const idxlim = (page - 1) * limitpage;
    sqlimit = `SELECT name, id, ktp_num FROM user LIMIT ${idxlim},${limitpage}`;
    // console.log(`idxlimit: ${idxlim}, ${limitpage}`)
    db.query(sqlimit, (err, result) => {
      if (err) throw err;
      let iterator = page - 1 < 1 ? 1 : page - 1;
      let endlink =
        iterator + 1 <= maxPage ? iterator + 9 : page + (maxPage - page);
      if (endlink < page + 1) {
        iterator -= page + 1 - maxPage;
      }
      const session = req.session.userid;
      res.render("dashboard/member", {
        logged: session,
        data: result,
        page,
        iterator,
        maxPage,
        endlink,
      });
    });
  });
}

function memberCreate(req,res) {
  // TODO: Normalize Input user
  let { name, ktp } = req.body;
  const ccmd = `INSERT INTO user (name , ktp_num) VALUES ("${name}", ${ktp})`;
  db.query(ccmd, (err, result) => {
    if (err) throw err;
    res.redirect("/member");
    console.log(result);
  });
}

function memberEdit(req,res) {
  // TODO: Normalize Input user
  const id = req.params.id;
  const { name } = req.body;

  const query = `UPDATE user SET name = "${name}" WHERE id = ${id}`;

  db.query(query, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.redirect("/member");
    }
  });
}
function memberDelete(req,res) {
		const id = req.params.id;
    const query = `DELETE FROM user WHERE id = "${id}"`;
    db.query(query, (err, data) => {
      if (err) {
        throw err;
      } else {
        res.redirect("/member");
      }
    });
}


module.exports = {
	show: memberShow,
	edit: memberEdit,
	create: memberCreate,
	delete: memberDelete,
};