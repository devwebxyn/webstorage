CREATE TABLE "files" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"path" text NOT NULL,
	"size" integer NOT NULL,
	"type" varchar(100) NOT NULL,
	"url" text NOT NULL,
	"is_public" boolean DEFAULT false NOT NULL,
	"storage_provider" varchar(50) DEFAULT 'mega' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255),
	"clerk_data" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
