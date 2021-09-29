// Update with your config settings.
module.exports = {
	development: {
		client: "pg",
		useNullAsDefault: true,
		debug: process.env.NODE_ENV === "development",
		connection: "postgres://satyam:name1234@localhost:5432/example_db",
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			directory: "./database/migrations",
		},
		seeds: {
			directory: "./database/seeds",
		},
	},

	staging: {
		client: "pg",
		useNullAsDefault: true,
		connection: "postgres://username:password@localhost:5432/example_db",
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			directory: "./database/migrations",
		},
		seeds: {
			directory: "./database/seeds",
		},
	},

	production: {
		client: "pg",
		useNullAsDefault: true,
		connection: {
			host: process.env.PG_PRO_HOST,
			port: process.env.PG_PRO_PORT,
			user: process.env.PG_PRO_USER,
			password: process.env.PG_PRO_PASSWORD,
			database: process.env.PG_PRO_DATABASE,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			directory: "./database/migrations",
		},
		seeds: {
			directory: "./database/seeds",
		},
	},
};
