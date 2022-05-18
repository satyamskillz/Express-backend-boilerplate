const passwordProcessing = require("../processing/password");
const logger = require("../logger");

// Register user function
// Input: Name, Username, Email, Password
// Output: JWToken with refresh token
module.exports.register = async (req, res) => {
	try {
		var { fullname, username, email, password } = req.body;

		// Vailding form data
		if (!fullname || !username || !email || !password) {
			return res.status(400).send("Enter all details");
		}

		// Hashing password
		var password = await passwordProcessing.getHassPassword(password);

		// Creating user

		// Creating tokens

		// Sending response
		return res.status(201).send({
			msg: "User is register",
			token,
			refreshToken,
		});
	} catch (error) {
		logger.error(error);
		return res.status(500).send("Internal Server Error");
	}
};

// Login user function
// Input: Email, Password
// Output: JWToken with refresh token
module.exports.login = async (req, res) => {
	try {
		var { email, password } = req.body;
		// Vailding form data
		if (!email || !password) {
			return res.status(400).send("Enter all details");
		}
		// Fetching user data
		// Comparing passwords
		// Creating tokens
		// sending response
	} catch (error) {
		logger.error(error);
		return res.status(500).send("Internal Server Error");
	}
};

// Relogin user function
// Input: JWToken with refresh token
// Output: new JWToken with refresh token
module.exports.relogin = async (req, res) => {
	try {
	} catch (error) {
		logger.error(error);
		return res.status(500).send("Internal Server Error");
	}
};
