CREATE TABLE `authors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`bio` text,
	`github_handle` varchar(255),
	`twitter_handle` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `authors_id` PRIMARY KEY(`id`),
	CONSTRAINT `authors_email_unique` UNIQUE(`email`)
);
