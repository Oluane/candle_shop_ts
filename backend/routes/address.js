const express = require("express");
const router = express.Router({ mergeParams: true });

const { db } = require("../conf");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", isAuthenticated, (req, res) => {
	const userId = req.params.userId;

	if (!userId) {
		return res.status(401).json({ message: "OOPS! Missing userId" });
	}

	db.query(
		`SELECT ca.id, ca.name, ca.address, ca.address_complement, ca.zip_code, ca.city, ca.is_favorite FROM customer_address ca WHERE ca.customer_id = ?;`,
		[userId],
		(err, results) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: "Internal Error" });
			} else {
				res.status(200).json(results);
			}
		}
	);
});

router.post(
	"/",
	isAuthenticated,
	(req, res, next) => {
		const userId = req.params.userId;
		const newAddressData = req.body;

		if (!userId) {
			return res.status(401).json({ message: "OOPS! Missing userId" });
		}

		if (newAddressData.is_favorite === 1) {
			db.query(`CALL ResetFavAddress(?, ?)`, [userId, 0], (err, results) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Internal Error" });
				}
				next();
			});
		} else {
			next();
		}
	},
	(req, res) => {
		const userId = req.params.userId;
		const newAddressData = req.body;

		newAddressData.customer_id = userId;

		db.query(`INSERT INTO customer_address SET ?`, [newAddressData], (err, results) => {
			if (err) {
				console.log(err);
				return res.status(500).json({ message: "Internal Error" });
			}
			res.status(200).json(results);
		});
	}
);

router.put(
	"/:addressId",
	isAuthenticated,
	(req, res, next) => {
		const addressId = req.params.addressId;
		const userId = req.params.userId;
		const addressData = req.body;

		if (!addressId) {
			return res.status(401).json({ message: "OOPS! Missing addressId" });
		}

		if (!userId) {
			return res.status(401).json({ message: "OOPS! Missing userId" });
		}

		if (addressData.is_favorite === 1) {
			db.query(`CALL ResetFavAddress(?, ?)`, [userId, addressId], (err, results) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Internal Error" });
				}
				next();
			});
		} else {
			next();
		}
	},
	(req, res) => {
		const addressId = req.params.addressId;
		const userId = req.params.userId;
		const addressData = req.body;
		db.query(
			`UPDATE customer_address ca SET ? WHERE ca.customer_id = ? AND ca.id = ?;`,
			[addressData, userId, addressId],
			(err, results) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Internal Error" });
				} else {
					res.status(204).send();
				}
			}
		);
	}
);

router.delete(
	"/:addressId",
	isAuthenticated,
	(req, res, next) => {
		const userId = req.params.userId;

		if (!userId) {
			return res.status(401).json({ message: "OOPS! Missing addressId" });
		}

		db.query(
			`SELECT ca.id, ca.is_favorite FROM customer_address ca WHERE ca.customer_id = ?`,
			[userId],
			(err, results) => {
				if (err) {
					console.log(err);
					return res.status(500).json({ message: "Internal Error" });
				}
				res.locals.addresses = results;
				next();
			}
		);
	},
	(req, res) => {
		const addressId = Number(req.params.addressId);

		const userId = req.params.userId;

		if (!userId) {
			return res.status(401).json({ message: "OOPS! Missing addressId" });
		}

		if (!addressId) {
			return res.status(401).json({ message: "OOPS! Missing addressId" });
		}

		const userAddresses = res.locals.addresses;

		const addressToDelete = userAddresses.find((address) => address.id === addressId);

		if (addressToDelete.is_favorite !== 1 || userAddresses.length === 1) {
			db.query(
				`DELETE FROM customer_address WHERE id = ? AND customer_id = ?;`,
				[addressId, userId],
				(err, results) => {
					if (err) {
						console.log(err);
						return res.status(500).json({ message: "Internal Error" });
					} else {
						res.status(200).send();
					}
				}
			);
		} else {
			const nextFavAddress =
				userAddresses[0].id !== addressId ? userAddresses[0] : userAddresses[1];
			db.getConnection((err, connection) => {
				connection.beginTransaction((err) => {
					if (err) throw err;

					connection.query(
						`DELETE FROM customer_address WHERE id = ? AND customer_id = ?;`,
						[addressId, userId],
						(err, results) => {
							if (err) {
								connection.rollback(() => {
									throw err;
								});
							}

							connection.query(
								`UPDATE customer_address ca SET ca.is_favorite = 1 WHERE ca.id = ? AND ca.customer_id = ?`,
								[nextFavAddress.id, userId],
								(err, results) => {
									if (err) {
										connection.rollback(() => {
											throw err;
										});
                                    }

									connection.commit((err) => {
										if (err) {
											connection.rollback(() => {
												throw err;
											});
										}
										connection.release();
										return res.status(200).json({newFavId : nextFavAddress.id});
									});
								}
							);
						}
					);
				});
			});
		}
	}
);

module.exports = router;
