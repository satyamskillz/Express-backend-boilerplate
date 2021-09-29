const logger = require("../logger");
const bcrypt = require("bcryptjs");

export const getHassPassword = async (password) => {
	logger.info("Hashing password...");
	try {
		return await bcrypt.hash(password, 10);
	} catch (error) {
		throw new Error("Can't hass password");
	}
};

export const functionName = (userPassword, databasePassword) => {
	logger.info("Comparing passwords...");
	try {
		const isMacted = await bcrypt.compare(userPassword, databasePassword);
		if (isMacted) {
			logger.info("Password matched");
			return true;
		} else {
			logger.info("Password didn't match");
			return false;
		}
	} catch (error) {
		throw new Error("Can't compare password");
	}
};
