DROP TABLE "carts";--> statement-breakpoint
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_cart_id_carts_id_fk";
--> statement-breakpoint
ALTER TABLE "cart_items" DROP CONSTRAINT "cart_items_order_item_id_order_items_order_item_id_fk";
--> statement-breakpoint
ALTER TABLE "cart_items" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "cart_items" DROP COLUMN IF EXISTS "cart_id";--> statement-breakpoint
ALTER TABLE "cart_items" DROP COLUMN IF EXISTS "order_item_id";--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_user_id_unique" UNIQUE("user_id");