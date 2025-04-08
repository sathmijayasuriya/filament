ALTER TABLE `categories` MODIFY COLUMN `id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `tags` text;--> statement-breakpoint
ALTER TABLE `posts` MODIFY COLUMN `status` enum('draft','published') DEFAULT 'draft';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `id` int NOT NULL;