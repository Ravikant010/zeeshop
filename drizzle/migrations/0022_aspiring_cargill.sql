ALTER TABLE "payments" ALTER COLUMN "payment_method" SET DEFAULT 'card';--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "amount" SET DATA TYPE integer;