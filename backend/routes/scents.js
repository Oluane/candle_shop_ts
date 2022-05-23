const express = require("express");
const router = express.Router();

const { db } = require("../conf");

router.get("/", (req, res) => {
	db.query(
		`SELECT id, en_name, en_desc, is_essential_oil, scents_category_id FROM scents`,
		(err, results) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: "Internal Error" });
			}

			if (results.length) {
				res.status(200).json(results);
			}
		}
	);
});

module.exports = router;
