DO $$ BEGIN
 CREATE TYPE "public"."order_status" AS ENUM('pending', 'ordered', 'processing', 'shipped', 'delivered', 'cancelled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_order_id_orders_order_id_fk";
--> statement-breakpoint
ALTER TABLE "order_items" ALTER COLUMN "price" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "status" SET DATA TYPE order_status;--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "size" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "order_item_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_order_item_id_order_items_order_item_id_fk" FOREIGN KEY ("order_item_id") REFERENCES "public"."order_items"("order_item_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "order_items" DROP COLUMN IF EXISTS "order_id";