CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	CONSTRAINT "session_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
DROP TABLE "user_session";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
