// db/schema.js
const { mysqlTable, serial, varchar, text, int, timestamp, boolean, json ,mysqlEnum } = require('drizzle-orm/mysql-core');

const categories = mysqlTable('categories', {
  id: int('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  visibility: boolean('visibility'),
  description: text('description'),
//   user_id: int('user_id').notNull().references(() => users.id),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
});

const posts = mysqlTable('posts', {
  id: int('id').primaryKey(),
//   user_id: int('user_id').notNull().references(() => users.id),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  content: text('content'),
  category_id: int('category_id').references(() => categories.id),
  image_path: varchar('image_path', { length: 255 }),
  tags: text('tags'),
  published_at: timestamp('published_at'),
  status: mysqlEnum('status', ['draft', 'published']).default('draft'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').onUpdateNow(),
});

const users = mysqlTable('users', {
    id: int('id').primaryKey(),
    username: varchar('username', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').onUpdateNow(),
  });
  

module.exports = { categories, posts , users};