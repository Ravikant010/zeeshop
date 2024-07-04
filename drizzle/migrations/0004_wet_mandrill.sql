ALTER TABLE "user_session" DROP CONSTRAINT "user_session_user_id_userTable_id_fk";
--> statement-breakpoint
ALTER TABLE "user_session" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_session" ADD CONSTRAINT "user_session_userId_userTable_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."userTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user_session" DROP COLUMN IF EXISTS "user_id";