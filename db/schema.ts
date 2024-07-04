import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  varchar,
} from "drizzle-orm/pg-core"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import type { AdapterAccountType } from "next-auth/adapters"
const connectionString = process.env.AUTH_DRIZZLE_URL as string
export const pool = postgres(connectionString, { max: 1 })
export const db = drizzle(pool)
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})
export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)
export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
)
export const addresses = pgTable('addresses', {
  addressId: serial('address_id').primaryKey(),
  userId: text("userId").references(() => users.id, {onDelete: "cascade"}).notNull(),
  streetAddress: varchar('street_address', { length: 255 }).notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  state: varchar('state', { length: 100 }).notNull(),
  postalCode: varchar('postal_code', { length: 20 }).notNull(),
  country: varchar('country', { length: 100 }).notNull(),
});
// Orders table
export const orders = pgTable('orders', {
  orderId: serial('order_id').primaryKey(),
  userId: text("userId").references(() => users.id, {onDelete: "cascade"}).notNull(),
  addressId: integer('address_id').references(() => addresses.addressId).notNull(),
  orderDate: timestamp('order_date').defaultNow().notNull(),
  status: varchar('status', { length: 50 }).notNull(),
});
// OrderItems table
export const orderItems = pgTable('order_items', {
  orderItemId: serial('order_item_id').primaryKey(),
  orderId: integer('order_id').references(() => orders.orderId).notNull(),
  productId: integer('product_id').notNull(),
  quantity: integer('quantity').notNull(),
  price: varchar('price', { length: 50 }).notNull(),
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


export const userTable = pgTable("userTable", {
	id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  password_hash: text('password').notNull()
});

export const sessionTable = pgTable("user_session", {
	id: text("id").primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});
