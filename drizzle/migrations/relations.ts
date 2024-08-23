import { relations } from "drizzle-orm/relations";
import { users, addresses, order_items, orders, payments, accounts, profile, reset_tokens, session, verify_email_tokens, cart_items } from "./schema";

export const addressesRelations = relations(addresses, ({one, many}) => ({
	user: one(users, {
		fields: [addresses.userId],
		references: [users.id]
	}),
	orders: many(orders),
}));

export const usersRelations = relations(users, ({many}) => ({
	addresses: many(addresses),
	orders: many(orders),
	accounts: many(accounts),
	profiles: many(profile),
	reset_tokens: many(reset_tokens),
	sessions: many(session),
	verify_email_tokens: many(verify_email_tokens),
	cart_items: many(cart_items),
}));

export const ordersRelations = relations(orders, ({one, many}) => ({
	order_item: one(order_items, {
		fields: [orders.order_item_id],
		references: [order_items.order_item_id]
	}),
	user: one(users, {
		fields: [orders.userId],
		references: [users.id]
	}),
	address: one(addresses, {
		fields: [orders.address_id],
		references: [addresses.address_id]
	}),
	payments: many(payments),
}));

export const order_itemsRelations = relations(order_items, ({many}) => ({
	orders: many(orders),
}));

export const paymentsRelations = relations(payments, ({one}) => ({
	order: one(orders, {
		fields: [payments.order_id],
		references: [orders.order_id]
	}),
}));

export const accountsRelations = relations(accounts, ({one}) => ({
	user: one(users, {
		fields: [accounts.user_id],
		references: [users.id]
	}),
}));

export const profileRelations = relations(profile, ({one}) => ({
	user: one(users, {
		fields: [profile.user_id],
		references: [users.id]
	}),
}));

export const reset_tokensRelations = relations(reset_tokens, ({one}) => ({
	user: one(users, {
		fields: [reset_tokens.user_id],
		references: [users.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(users, {
		fields: [session.user_id],
		references: [users.id]
	}),
}));

export const verify_email_tokensRelations = relations(verify_email_tokens, ({one}) => ({
	user: one(users, {
		fields: [verify_email_tokens.user_id],
		references: [users.id]
	}),
}));

export const cart_itemsRelations = relations(cart_items, ({one}) => ({
	user: one(users, {
		fields: [cart_items.user_id],
		references: [users.id]
	}),
}));