var debug = require("debug")("server:server");
var cookieParser = require("cookie-parser");
var createError = require("http-errors");
var express = require("express");
var dotenv = require("dotenv");
var logger = require("morgan");
var http = require("http");
var app = express();
dotenv.config();

// cors middleware
app.use((req, res, next) => {
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type,x-token, x-refresh-token"
	);
	if (process.env.NODE_ENV === "production") {
		res.setHeader("Access-Control-Allow-Origin", "http://localhost");
	} else {
		res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
	}
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader("Access-Control-Expose-Headers", "x-token, x-refresh-token");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, DELETE"
	);
	next();
});

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use("/api/user", require("./routes/users"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/utils", require("./routes/utils"));

// Custom Error handler
app.use((err, req, res, next) => {
	console.log(err);
	const status = err.statusCode || 500;
	const message = err.message;
	const data = err.data;
	res.status(status).json({
		message: message,
		errCode: status,
		data: data,
	});
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};
	// render the error page
	res.status(err.status || 500);
});
// Get port from environment and store in Express.
var port = normalizePort(process.env.PORT || "5555");
app.set("port", port);
console.log(`[PORT]: http://localhost:${port}`);

// Create HTTP server.
var server = http.createServer(app);
// Listen on provided port, on all network interfaces.
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

// Normalize a port into a number, string, or false.
function normalizePort(val) {
	var port = parseInt(val, 10);
	if (isNaN(port)) {
		// named pipe
		return val;
	}
	if (port >= 0) {
		// port number
		return port;
	}
	return false;
}

// Event listener for HTTP server "error" event.
function onError(error) {
	if (error.syscall !== "listen") {
		throw error;
	}
	var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already in use");
			process.exit(1);
			break;
		default:
			throw error;
	}
}

//  Event listener for HTTP server "listening" event.
function onListening() {
	var addr = server.address();
	var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
	debug("Listening on " + bind);
}

module.exports = app;
