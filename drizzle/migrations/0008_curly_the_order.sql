ALTER TABLE "sale_boxes" DROP CONSTRAINT "sale_boxes_box_id_boxes_id_fk";
--> statement-breakpoint
ALTER TABLE "boxes" ADD COLUMN "active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sale_boxes" ADD CONSTRAINT "sale_boxes_box_id_boxes_id_fk" FOREIGN KEY ("box_id") REFERENCES "public"."boxes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
