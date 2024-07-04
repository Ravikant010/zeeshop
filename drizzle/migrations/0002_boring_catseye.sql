ALTER TABLE "addresses" DROP CONSTRAINT "addresses_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "addresses" ADD CONSTRAINT "addresses_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "addresses" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "user_id";