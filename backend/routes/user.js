const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

const { db } = require("../conf");

router.get("/", isAuthenticated, (req, res) => {
	const userId = req.user;

	if (!userId) {
		return res.status(401).json({ message: "OOPS! Missing userId" });
	}

	db.query(
		`SELECT c.id, c.first_name, c.last_name, c.mail_address, 
        DATE_FORMAT(c.birthdate, '%Y-%m-%d') as birthdate, c.phone_number, c.cgu_checked , 
        c.newsletter_checked, DATE_FORMAT(c.sign_up_datetime, '%Y-%m-%d') as sign_up_date 
        FROM customer c
        WHERE c.id = ?`,
		[userId],
		(err, results) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: "Internal Error" });
			}
			if (results.length) {
				return res.status(200).json(results);
			}
		}
	);
});

router.put("/", isAuthenticated, (req, res) => {
	const userId = req.user;
	const customerData = req.body;

	if (!userId) {
		return res.status(401).json({ message: "OOPS! Missing userId" });
	}

	db.query(`UPDATE customer SET ? WHERE id = ?`, [customerData, userId], (err, results) => {
		if (err) {
			console.log(err);
			return res.status(500).json({ message: "Internal Error" });
		} else {
			res.status(204).send();
		}
	});
});

router.use("/:userId/wishlist", require("./wishlist"));
router.use("/:userId/address", require("./address"));

module.exports = router;
