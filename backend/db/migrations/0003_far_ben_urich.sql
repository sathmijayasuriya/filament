ALTER TABLE `posts` DROP FOREIGN KEY `posts_category_id_categories_id_fk`;
--> statement-breakpoint
ALTER TABLE `categories` MODIFY COLUMN `visibility` boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `category_id` int DEFAULT null;--> statement-breakpoint
ALTER TABLE `posts` ADD CONSTRAINT `posts_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE set null ON UPDATE no action;