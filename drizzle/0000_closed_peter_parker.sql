DO $$ BEGIN
 CREATE TYPE "roles" AS ENUM('USER', 'ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"login" text,
	"password" text,
	"email" text,
	"emailVerified" timestamp,
	"role" "roles" DEFAULT 'USER',
	"image" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
