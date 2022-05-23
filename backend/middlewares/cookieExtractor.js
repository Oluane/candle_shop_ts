const cookieExtractor = (req) => {
	let token = null;

	if (req && req.cookies.access_token) {
		token = req.cookies.access_token;
	}

	return token;
};

module.exports = cookieExtractor;
