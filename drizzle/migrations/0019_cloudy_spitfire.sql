ALTER TABLE "orders" ADD COLUMN "pending" "order_status" NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "status";