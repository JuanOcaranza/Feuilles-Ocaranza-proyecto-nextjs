CREATE TABLE IF NOT EXISTS "sale_boxes" (
	"sale_id" integer NOT NULL,
	"box_id" serial NOT NULL,
	"quantity" integer NOT NULL,
	"price" real NOT NULL,
	CONSTRAINT "sale_boxes_sale_id_box_id_pk" PRIMARY KEY("sale_id","box_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sale_items" (
	"sale_id" integer NOT NULL,
	"item_id" serial NOT NULL,
	"quantity" integer NOT NULL,
	CONSTRAINT "sale_items_sale_id_item_id_pk" PRIMARY KEY("sale_id","item_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sales" (
	"id" integer PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sale_boxes" ADD CONSTRAINT "sale_boxes_sale_id_sales_id_fk" FOREIGN KEY ("sale_id") REFERENCES "public"."sales"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sale_boxes" ADD CONSTRAINT "sale_boxes_box_id_boxes_id_fk" FOREIGN KEY ("box_id") REFERENCES "public"."boxes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sale_items" ADD CONSTRAINT "sale_items_sale_id_sales_id_fk" FOREIGN KEY ("sale_id") REFERENCES "public"."sales"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sale_items" ADD CONSTRAINT "sale_items_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
