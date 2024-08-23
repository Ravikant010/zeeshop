import { pgTable, foreignKey, pgEnum, serial, integer, varchar, timestamp, unique, text, date } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const order_status = pgEnum("order_status", ['pending', 'ordered', 'processing', 'shipped', 'delivered', 'cancelled'])


export const addresses = pgTable("addresses", {
	address_id: serial("address_id").primaryKey().notNull(),
	userId: integer("userId").notNull().references(() => users.id, { onDelete: "cascade" } ),
	street_address: varchar("street_address", { length: 255 }).notNull(),
	city: varchar("city", { length: 100 }).notNull(),
	state: varchar("state", { length: 100 }).notNull(),
	postal_code: varchar("postal_code", { length: 20 }).notNull(),
	country: varchar("country", { length: 100 }).notNull(),
});

export const orders = pgTable("orders", {
	order_id: serial("order_id").primaryKey().notNull(),
	userId: integer("userId").notNull().references(() => users.id, { onDelete: "cascade" } ),
	address_id: integer("address_id").notNull().references(() => addresses.address_id),
	order_date: timestamp("order_date", { mode: 'string' }).defaultNow().notNull(),
	order_item_id: integer("order_item_id").notNull().references(() => order_items.order_item_id),
	pending: order_status("pending").notNull(),
});

export const magic_links = pgTable("magic_links", {
	id: serial("id").primaryKey().notNull(),
	email: varchar("email").notNull(),
	token: text("token"),
	token_expires_at: timestamp("token_expires_at", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		magic_links_email_unique: unique("magic_links_email_unique").on(table.email),
	}
});

export const payments = pgTable("payments", {
	payment_id: serial("payment_id").primaryKey().notNull(),
	order_id: integer("order_id").notNull().references(() => orders.order_id, { onDelete: "cascade" } ),
	payment_method: varchar("payment_method", { length: 50 }).default('card'::character varying).notNull(),
	amount: text("amount").notNull(),
	payment_date: timestamp("payment_date", { mode: 'string' }).defaultNow().notNull(),
	status: varchar("status", { length: 50 }).notNull(),
});

export const accounts = pgTable("accounts", {
	id: serial("id").primaryKey().notNull(),
	user_id: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	account_type: text("account_type").notNull(),
	github_id: text("github_id"),
	google_id: text("google_id"),
	password: text("password"),
	salt: text("salt"),
},
(table) => {
	return {
		accounts_user_id_unique: unique("accounts_user_id_unique").on(table.user_id),
		accounts_github_id_unique: unique("accounts_github_id_unique").on(table.github_id),
		accounts_google_id_unique: unique("accounts_google_id_unique").on(table.google_id),
	}
});

export const profile = pgTable("profile", {
	id: serial("id").primaryKey().notNull(),
	user_id: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	display_name: varchar("display_name"),
	image_id: varchar("image_id"),
	image: varchar("image"),
	bio: text("bio").default('').notNull(),
},
(table) => {
	return {
		profile_user_id_unique: unique("profile_user_id_unique").on(table.user_id),
	}
});

export const reset_tokens = pgTable("reset_tokens", {
	id: serial("id").primaryKey().notNull(),
	user_id: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	token: text("token"),
	token_expires_at: timestamp("token_expires_at", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		reset_tokens_user_id_unique: unique("reset_tokens_user_id_unique").on(table.user_id),
	}
});

export const session = pgTable("session", {
	id: text("id").primaryKey().notNull(),
	user_id: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	expires_at: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
});

export const users = pgTable("users", {
	id: serial("id").primaryKey().notNull(),
	name: text("name"),
	email: text("email").notNull(),
	dob: date("dob"),
	emailVerified: timestamp("emailVerified", { mode: 'string' }),
},
(table) => {
	return {
		users_name_unique: unique("users_name_unique").on(table.name),
	}
});

export const verify_email_tokens = pgTable("verify_email_tokens", {
	id: serial("id").primaryKey().notNull(),
	user_id: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	token: text("token"),
	token_expires_at: timestamp("token_expires_at", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		verify_email_tokens_user_id_unique: unique("verify_email_tokens_user_id_unique").on(table.user_id),
	}
});

export const order_items = pgTable("order_items", {
	order_item_id: serial("order_item_id").primaryKey().notNull(),
	product_id: integer("product_id").notNull(),
	quantity: integer("quantity").notNull(),
	price: text("price").notNull(),
	size: text("size").notNull(),
});

export const cart_items = pgTable("cart_items", {
	id: serial("id").primaryKey().notNull(),
	size: text("size").notNull(),
	quantity: integer("quantity").default(1).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updated_at: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	user_id: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" } ),
	pdId: text("pdId").notNull(),
},
(table) => {
	return {
		cart_items_pdId_unique: unique("cart_items_pdId_unique").on(table.pdId),
	}
});