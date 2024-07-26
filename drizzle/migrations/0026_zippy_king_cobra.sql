ALTER TABLE "cart_items" ADD COLUMN "pdId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_pdId_unique" UNIQUE("pdId");