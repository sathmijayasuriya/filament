// db/schema.js
const {
  mysqlTable,
  serial,
  varchar,
  text,
  int,
  timestamp,
  boolean,
  json,
  mysqlEnum,
} = require("drizzle-orm/mysql-core");

const categories = mysqlTable("categories", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  visibility: boolean("visibility").default(true),
  description: text("description"),
  //   user_id: int('user_id').notNull().references(() => users.id),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").onUpdateNow(),
});

const posts = mysqlTable("posts", {
  id: int("id").primaryKey().autoincrement(),
  //   user_id: int('user_id').notNull().references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content"),
  category_id: int("category_id")
    .references(() => categories.id, { onDelete: "set null" })
    .default(null),
  image_path: varchar("image_path", { length: 255 }),
  tags: json("tags"),
  published_at: timestamp("published_at"),
  status: mysqlEnum("status", ["draft", "published"]).default("draft"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").onUpdateNow(),
});

const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").onUpdateNow(),
});

const authors = mysqlTable("authors", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  bio: text("bio"),
  github_handle: varchar("github_handle", { length: 255 }),
  twitter_handle: varchar("twitter_handle", { length: 255 }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").onUpdateNow(),
});

const links = mysqlTable("links", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  color: varchar("color", { length: 7 }).notNull(), // Hex color 
  description: text("description"),
  url: varchar("url", { length: 2048 }).notNull(),
  image: varchar("image", { length: 255 }), 
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").onUpdateNow(),
});


module.exports = { categories, posts, users, authors,links };
