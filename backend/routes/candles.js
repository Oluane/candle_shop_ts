const express = require("express");
const router = express.Router();

const { db } = require("../conf");

router.get("/types", (req, res) => {
	db.query(`SELECT id, en_name, en_desc FROM type`, (err, results) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ message: "Internal Error" });
		}

		if (results) {
			res.status(200).json(results);
		}
	});
});

//return candle info by a given candle id

router.get("/:candleId", (req, res) => {
	const { candleId } = req.params;

	db.query(
		`SELECT c.id candle_id, ts.type_id, ts.price, sc.en_name scents_en_name, t.en_name type_en_name, s.en_name size_en_name FROM candle c
    JOIN type_size ts ON c.type_size_id = ts.id
    JOIN scents sc ON c.scents_id = sc.id
    JOIN size s ON ts.size_id = s.id
    JOIN type t ON ts.type_id = t.id
    WHERE c.id = ?`,
		[candleId],
		(err, results) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: "Internal Error" });
			}
			if (results) {
				res.status(200).json(results);
			}
		}
	);
});

// return stock for a given candle id

router.get("/:candleId/stock", (req, res) => {
	const { candleId } = req.params;

	db.query(
		`SELECT c.id candle_id, c.stock available_stock FROM candle c WHERE c.id = ?`,
		[candleId],
		(err, results) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: "Internal Error" });
			}

			if (results) {
				res.status(200).json(results);
			}
		}
	);
});

// returns a candle id from a type_size id and a scent id

router.get("/type_size/:typeSizeId/scent/:scentId", (req, res) => {
	const { typeSizeId, scentId } = req.params;

	db.query(
		`SELECT c.id FROM candle c WHERE c.type_size_id = ? AND c.scents_id = ?`,
		[typeSizeId, scentId],
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

//subroutes

router.get("/types/:typeId/details", (req, res) => {
	const { typeId } = req.params;

	db.query(
		`SELECT ts.id type_size_id, ts.height_in_cm, ts.width_in_cm, ts.weight_in_gr, ts.duration_in_hours, ts.price,
        t.id type_id, t.en_name type_en_name, t.en_desc type_en_desc, s.id size_id, s.short_name, s.en_name size_en_name FROM type_size ts
        JOIN type t ON ts.type_id = t.id 
        JOIN size s ON ts.size_id = s.id
        WHERE ts.type_id = ? `,
		[typeId],
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
