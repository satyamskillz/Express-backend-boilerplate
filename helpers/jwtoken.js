const jwt = require("jsonwebtoken");

module.exports.createUserTokens = async (id, user) => {
	const token = jwt.sign(
		{
			data: user,
		},
		process.env.JWT_SECRET_1,
		{
			expiresIn: "10m",
		}
	);

	const refreshToken = jwt.sign(
		{
			data: { id },
		},
		process.env.JWT_SECRET_2 + data.password,
		{
			expiresIn: "30d",
		}
	);

	return Promise.all([token, refreshToken]);
};

// under prgress
module.exports.refreshUserTokens = async (refreshToken) => {
	let id = -1;
	try {
		const decoded = jwt.decode(refreshToken);
		id = decoded.data.id;
	} catch (err) {
		return false;
	}

	if (!id) {
		return false;
	}

	const user = await getUser(username);

	if (!user) {
		return false;
	}

	const refreshSecret = process.env.JWT_SECRET_2 + user.secret;

	try {
		jwt.verify(refreshToken, refreshSecret);
	} catch (err) {
		return false;
	}

	const [newToken, newRefreshToken] = await createUserTokens(id, user.data);

	return {
		token: newToken,
		refreshToken: newRefreshToken,
	};
};
