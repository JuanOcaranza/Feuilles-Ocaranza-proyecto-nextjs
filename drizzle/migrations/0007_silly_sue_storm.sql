ALTER TABLE "box_categories" DROP CONSTRAINT "box_categories_box_id_boxes_id_fk";
--> statement-breakpoint
ALTER TABLE "box_categories" DROP CONSTRAINT "box_categories_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "box_items" DROP CONSTRAINT "box_items_box_id_boxes_id_fk";
--> statement-breakpoint
ALTER TABLE "box_offers" DROP CONSTRAINT "box_offers_box_id_boxes_id_fk";
--> statement-breakpoint
ALTER TABLE "box_offers" DROP CONSTRAINT "box_offers_offer_id_offers_id_fk";
--> statement-breakpoint
ALTER TABLE "sale_boxes" DROP CONSTRAINT "sale_boxes_box_id_boxes_id_fk";
--> statement-breakpoint
ALTER TABLE "boxes" ALTER COLUMN "price" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "price" SET DATA TYPE integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "box_categories" ADD CONSTRAINT "box_categories_box_id_boxes_id_fk" FOREIGN KEY ("box_id") REFERENCES "public"."boxes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "box_categories" ADD CONSTRAINT "box_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "box_items" ADD CONSTRAINT "box_items_box_id_boxes_id_fk" FOREIGN KEY ("box_id") REFERENCES "public"."boxes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "box_offers" ADD CONSTRAINT "box_offers_box_id_boxes_id_fk" FOREIGN KEY ("box_id") REFERENCES "public"."boxes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "box_offers" ADD CONSTRAINT "box_offers_offer_id_offers_id_fk" FOREIGN KEY ("offer_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sale_boxes" ADD CONSTRAINT "sale_boxes_box_id_boxes_id_fk" FOREIGN KEY ("box_id") REFERENCES "public"."boxes"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
