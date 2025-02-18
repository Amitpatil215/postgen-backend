ALTER TABLE "persona_examples" RENAME TO "persona_posts_examples";--> statement-breakpoint
ALTER TABLE "persona_posts_examples" DROP CONSTRAINT "persona_examples_persona_id_personas_id_fk";
--> statement-breakpoint
ALTER TABLE "persona_posts_examples" DROP CONSTRAINT "persona_examples_post_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "persona_posts_examples" ADD CONSTRAINT "persona_posts_examples_persona_id_personas_id_fk" FOREIGN KEY ("persona_id") REFERENCES "public"."personas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "persona_posts_examples" ADD CONSTRAINT "persona_posts_examples_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;