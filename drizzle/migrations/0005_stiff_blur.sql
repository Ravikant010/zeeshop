CREATE TABLE IF NOT EXISTS "accounts" (
	"id" integer PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"account_type" text NOT NULL,
	"github_id" text,
	"google_id" text,
	"password" text,
	"salt" text,
	CONSTRAINT "accounts_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "accounts_github_id_unique" UNIQUE("github_id"),
	CONSTRAINT "accounts_google_id_unique" UNIQUE("google_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "magic_links" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"token" text,
	"token_expires_at" timestamp NOT NULL,
	CONSTRAINT "magic_links_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"display_name" varchar,
	"image_id" varchar,
	"image" varchar,
	"bio" text DEFAULT '' NOT NULL,
	CONSTRAINT "profile_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"dob" date,
	"emailVerified" timestamp,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verify_email_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"token" text,
	"token_expires_at" timestamp NOT NULL,
	CONSTRAINT "verify_email_tokens_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
DROP TABLE "account";--> statement-breakpoint
DROP TABLE "authenticator";--> statement-breakpoint
DROP TABLE "session";--> statement-breakpoint
DROP TABLE "userTable";--> statement-breakpoint
DROP TABLE "user";--> statement-breakpoint
DROP TABLE "verificationToken";--> statement-breakpoint
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user_session" DROP CONSTRAINT "user_session_userId_userTable_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "verify_email_tokens" ADD CONSTRAINT "verify_email_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "addresses" ADD CONSTRAINT "addresses_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_session" ADD CONSTRAINT "user_session_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
