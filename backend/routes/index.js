const express = require("express");
const app = express();
const router = express.Router();
const auth = require("./auth");
const user = require("./user");
const scentsFamilies = require("./scentsFamilies");
const candles = require("./candles");
const scents = require("./scents");

router.use("/auth", auth);
router.use("/user", user);
router.use("/scents_families", scentsFamilies);
router.use("/candles", candles);
router.use("/scents", scents);

router.get("/", (req, res) => {
	const msg = "Hello World";
	res.status(200).send(msg);
});

module.exports = router;
