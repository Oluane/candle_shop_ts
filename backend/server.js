const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const api = require("./routes");
const cookieParser = require("cookie-parser");

const {
	CONFIG: { backendPort },
} = require("./conf");

/*-------------------------------------------------- Tools */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(cookieParser());

/*-------------------------------------------------- Public Routes */

app.use("/api", api);

/*-------------------------------------------------- Server launch */

app.listen(backendPort, (err) => {
	if (err) {
		throw new Error("Something bad happened...");
	}

	console.log(`Server is listening on ${backendPort}`);
});
