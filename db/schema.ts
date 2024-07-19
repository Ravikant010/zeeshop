import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  varchar,
  date,
  pgEnum,
} from "drizzle-orm/pg-core"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import type { AdapterAccountType } from "next-auth/adapters"
const connectionString = process.env.DATABASE_URL as string
export const pool = postgres(connectionString, { max: 1 })
export const db = drizzle(pool)

export const accountTypeEnum = ["email", "google", "github"] as const;

export const users = pgTable("users", {
	id: serial('id').primaryKey(),
  username: text("name").unique(),
  email: text("email").notNull(),
  dob: date('dob'),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
});

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
  accountType: text('account_type', { enum: accountTypeEnum }).notNull(),
  githubId: text('github_id').unique(),
  googleId: text('google_id').unique(),
  password: text('password'),
  salt: text('salt'),
});

export const magicLinks = pgTable('magic_links', {
  id: serial('id').primaryKey(),
  email: varchar('email').notNull().unique(),
  token: text('token'),
  tokenExpiresAt: timestamp('token_expires_at').notNull(),
});


export const verifyEmailTokens = pgTable('verify_email_tokens', {
id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
  token: text('token'),
  tokenExpiresAt: timestamp('token_expires_at').notNull(),
});
export const profiles = pgTable('profile', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
  displayName: varchar('display_name'),
  imageId: varchar('image_id'),
  image: varchar('image'),
  bio: text('bio').notNull().default(''),
});

// export const sessions = pgTable('session', {
//   id: text('id').primaryKey(),
//   userId: integer('user_id')
//     .notNull()
//     .references(() => users.id, { onDelete: 'cascade' }),
//   expiresAt: integer('expires_at').notNull(),
// });

export const sessions = pgTable("session", {
	id: text("id").primaryKey(),
  userId: integer("user_id")  // Changed to text to match Lucia's expectations
  .notNull()
  .references(() => users.id, { onDelete: 'cascade' }),

	expiresAt: timestamp("expires_at", {
    withTimezone: true,
		mode: "date"
	}).notNull()
});

// pgTable('session', {
//   id: text('id').primaryKey(),
//   userId: integer('user_id')
//     .references(() => users.id, { onDelete: 'cascade' })
//     .notNull(),
//   expiresAt: timestamp('expires_at').notNull(),
// });


export const addresses = pgTable('addresses', {
  id: serial('address_id').primaryKey(),
  userId: integer("userId").references(() => users.id, {onDelete: "cascade"}).notNull(),
  streetAddress: varchar('street_address', { length: 255 }).notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  state: varchar('state', { length: 100 }).notNull(),
  postalCode: varchar('postal_code', { length: 20 }).notNull(),
  country: varchar('country', { length: 100 }).notNull(),
});
// Orders table
export const OrderStatus = pgEnum('order_status', [
  'pending',
  'ordered',
  'processing',
  'shipped',
  'delivered',
  'cancelled'
]);

export const orders = pgTable('orders', {
  orderId: serial('order_id').primaryKey(),
  orderItemId: integer("order_item_id").references(()=>orderItems.orderItemId).notNull(),
  userId: integer("userId").references(() => users.id, {onDelete: "cascade"}).notNull(),
  addressId: integer('address_id').references(() => addresses.id).notNull(),
  orderDate: timestamp('order_date').defaultNow().notNull(),
  status: OrderStatus('status').notNull(),
});
// OrderItems table
export const orderItems = pgTable('order_items', {
  orderItemId: serial('order_item_id').primaryKey(),
  // orderId: integer('order_id').references(() => orders.orderId).notNull(),
  productId: integer('product_id').notNull(),
  size: text("size").notNull(),
  quantity: integer('quantity').notNull(),
  price: integer("price").notNull()
});
// Payments table
export const payments = pgTable('payments', {
  paymentId: serial('payment_id').primaryKey(),
  orderId: integer('order_id').references(() => orders.orderId,{onDelete: "cascade"}).notNull(),
  paymentMethod: varchar('payment_method', { length: 50 }).notNull(),
  amount: varchar('amount', { length: 50 }).notNull(),
  paymentDate: timestamp('payment_date').defaultNow().notNull(),
  status: varchar('status', { length: 50 }).notNull(),
});

export const resetTokens = pgTable("reset_tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
  token: text("token"),
  tokenExpiresAt: timestamp("token_expires_at").notNull(),
});

export type User = typeof users.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
export type Address = typeof addresses.$inferSelect; 
// export const users = pgTable("user", {
//   id: text("id")
//     .primaryKey()
//     .$defaultFn(() => crypto.randomUUID()),
//   name: text("name"),
//   email: text("email").notNull(),
//   dob: date('dob'),
//   emailVerified: timestamp("emailVerified", { mode: "date" }),
//   image: text("image"),
// })





// export const sessions = pgTable("session", {
//   sessionToken: text("sessionToken").primaryKey(),
//   userId: text("userId")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   expires: timestamp("expires", { mode: "date" }).notNull(),
// })

// export const sessionTable = pgTable("user_session", {
// 	id: text("id").primaryKey(),
// 	userId: text("userId")
// 		.notNull()
// 		.references(() => userTable.id),
// 	expiresAt: timestamp("expires_at", {
// 		withTimezone: true,
// 		mode: "date"
// 	}).notNull()
// });



// export const verificationTokens = pgTable(
//   "verificationToken",
//   {
//     identifier: text("identifier").notNull(),
//     token: text("token").notNull(),
//     expires: timestamp("expires", { mode: "date" }).notNull(),
//   },
//   (verificationToken) => ({
//     compositePk: primaryKey({
//       columns: [verificationToken.identifier, verificationToken.token],
//     }),
//   })
// )
// export const authenticators = pgTable(
//   "authenticator",
//   {
//     credentialID: text("credentialID").notNull().unique(),
//     userId: text("userId")
//       .notNull()
//       .references(() => users.id, { onDelete: "cascade" }),
//     providerAccountId: text("providerAccountId").notNull(),
//     credentialPublicKey: text("credentialPublicKey").notNull(),
//     counter: integer("counter").notNull(),
//     credentialDeviceType: text("credentialDeviceType").notNull(),
//     credentialBackedUp: boolean("credentialBackedUp").notNull(),
//     transports: text("transports"),
//   },
//   (authenticator) => ({
//     compositePK: primaryKey({
//       columns: [authenticator.userId, authenticator.credentialID],
//     }),
//   })
// )
