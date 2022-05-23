const jwt = require("jsonwebtoken");
const {
	CONFIG: { jwtSecret },
} = require("../conf");

const isAuthenticated = (req, res, next) => {
	try {
		const { cookies, headers } = req;

		if (!cookies || !cookies.access_token) {
			return res.status(401).json({ message: "OOPS! Missing cookies" });
		}

		const accessToken = cookies.access_token;

		if (!headers || !headers["x-xsrf-token"]) {
			return res.status(401).json({ message: "OOPS! Missing XSRF token in headers" });
		}

		const xsrfToken = headers["x-xsrf-token"];

		const decodedToken = jwt.verify(accessToken, jwtSecret);

		if (xsrfToken != decodedToken.xsrfToken) {
			return res.status(401).json({ message: "OOPS! Bad xsrf token" });
		}

		if (Date.now() / 1000 > decodedToken.exp) {
			return res.status(401).json({ message: "OOPS! Expired token" });
		}

		const userId = decodedToken.sub;
		req.user = userId;

		return next();
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal Error" });
	}
};

module.exports = isAuthenticated;
