require("dotenv").config();
const mysql = require("mysql");

let CONFIG = {
	backendPort: process.env.BACKEND_PORT || "4200",
	jwtSecret: process.env.JWT_SECRET || "secretSentence",
	saltRounds: process.env.SALT_ROUNDS || "5",
	accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || 10000000,
};

const db = mysql.createPool({
	connectionLimit: 10,
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "anotherUser",
	password: process.env.DB_PASSWORD || "password",
	database: process.env.DB_NAME || "database",
});

module.exports = { CONFIG, db };
