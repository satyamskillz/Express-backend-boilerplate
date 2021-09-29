exports.up = (knex) =>
	Promise.all([
		knex.schema.createTable("users", (t) => {
			t.increments("id").primary();
			t.string("fullname", 50).notNullable();
			t.string("username", 50).notNullable().unique();
			t.string("email", 100).notNullable().unique();
			t.string("password").notNullable();

			t.string("dob", 10);
			t.string("bio", 200);
			t.string("phone", 16);
			t.string("location", 120);

			t.text("avatar");
			t.text("avatar_key");
			t.text("aws_bucket");
			t.text("secret_code");

			t.boolean("is_blocked").notNullable().defaultTo(false);
			t.boolean("is_verified").notNullable().defaultTo(false);
			t.boolean("is_reported").notNullable().defaultTo(false);

			t.enum("theme", ["L", "D"]).defaultTo("L");
			t.enum("role", ["M", "A", "T"]).defaultTo("M");
			t.enum("gender", ["M", "F", "O", "N"]).defaultTo("N");

			t.bigInteger("relogins").notNullable().defaultTo(0);
			t.timestamps(true, true);
		}),
	]);

exports.down = (knex) => Promise.all([knex.schema.dropTableIfExists("users")]);
