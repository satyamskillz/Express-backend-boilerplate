const { refreshTokens } = require("../helpers/jwtoken");
const jwt = require("jsonwebtoken");

const SecureAuthUser = async (req, res, next) => {
	const token = req.headers["x-token"];

	if (token) {
		try {
			const { data } = jwt.verify(token, process.env.JWT_SECRET_1);
			req.user = data;
		} catch (err) {
			const refreshToken = req.headers["x-refresh-token"];
			const newTokens = await refreshTokens(refreshToken);

			if (newTokens.token && newTokens.refreshToken) {
				// send new tokens in header
				res.set("x-token", newTokens.token);
				res.set("x-refresh-token", newTokens.refreshToken);

				const { data } = jwt.decode(newTokens.token);
				req.user = data;
			}
		}
		next();
	} else {
		return res.status(401).send("User isn't authorized");
	}
};
module.exports = SecureAuthUser;
