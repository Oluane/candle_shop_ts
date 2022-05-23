const express = require("express");
const router = express.Router();

const { db } = require("../conf");

router.get("/", (req, res) => {
	db.query("SELECT id, en_name FROM scents_category", (err, results) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ message: "Internal Error" });
		}

		if (results.length) {
			res.status(200).json(results);
		}
	});
});

router.get("/:catId", (req, res) => {
	const catId = req.params.catId;
	db.query(
		"SELECT id, en_name, en_desc FROM scents_category WHERE id = ?",
		[catId],
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

router.get("/:catId/scents", (req, res) => {
	const catId = req.params.catId;
	db.query(
		"SELECT s.id, s.en_name, s.en_desc, s.is_essential_oil, s.scents_category_id, sc.en_name family FROM scents s JOIN scents_category sc ON scents_category_id = sc.id WHERE s.scents_category_id = ?",
		[catId],
		(err, results) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: "Internal Error", error: err });
			}

			if (results.length) {
				res.status(200).json(results);
			}
		}
	);
});

module.exports = router;
