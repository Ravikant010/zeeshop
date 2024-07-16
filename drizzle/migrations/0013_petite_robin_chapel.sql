ALTER TABLE "profile" ALTER COLUMN "display_name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "image_id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "image" SET DATA TYPE varchar(1024);--> statement-breakpoint
ALTER TABLE "profile" ALTER COLUMN "bio" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE serial;