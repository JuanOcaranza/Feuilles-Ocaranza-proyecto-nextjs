CREATE TABLE IF NOT EXISTS "box_offers" (
	"box_id" serial NOT NULL,
	"offer_id" serial NOT NULL,
	"discount" integer NOT NULL,
	CONSTRAINT "box_offers_box_id_offer_id_pk" PRIMARY KEY("box_id","offer_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "offers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"starts_at" timestamp NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "box_items" ADD CONSTRAINT "box_items_box_id_item_id_pk" PRIMARY KEY("box_id","item_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "box_offers" ADD CONSTRAINT "box_offers_box_id_boxes_id_fk" FOREIGN KEY ("box_id") REFERENCES "public"."boxes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "box_offers" ADD CONSTRAINT "box_offers_offer_id_offers_id_fk" FOREIGN KEY ("offer_id") REFERENCES "public"."offers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
