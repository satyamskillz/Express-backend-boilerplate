var nodemailer = require("nodemailer");
var path = require("path");
var ejs = require("ejs");
var fs = require("fs");

export const sendResetPasswordMail = async (email, token) => {
	try {
		// fetching mail templete
		var template = fs.readFileSync(
			path.join(__dirname, "/templates/ResetMail.html"),
			{
				encoding: "utf-8",
			}
		);

		// Starting node mailer transport server
		var transport = nodemailer.createTransport({
			host: "smtpout.secureserver.net",
			secureConnection: true,
			port: 465,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		// link of reset password
		const link =
			process.env.NODE_ENV === "production"
				? "https://example.com" + "/auth/forgotpassword/" + token
				: "http://localhost:3000" + "/auth/forgotpassword/" + token;

		// Setting up mail option which includes
		// from: sender email address
		// to: reciver email address
		// subject: suject of email
		// html: body of email
		const mailOptions = {
			from: process.env.EMAIL_FROM,
			to: email,
			subject: "Reset Password Link",
			html: ejs.render(template, { link }),
		};

		// Sending Mail
		await transport.sendMail(mailOptions);

		// Closing transport server
		transport.close();
		return true;
	} catch (error) {
		return false;
	}
};
