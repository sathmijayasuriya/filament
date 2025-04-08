require('dotenv/config'); 

export default {
    schema: "./db/schema/schema.js",
    out: "./db/migrations",
    // driver: 'mysql',
    dialect: 'mysql',
    dbCredentials: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};

// define database  schema 
// generate sql migrations
// applying  migrations to local postgres instance or neon dev branch
// open pull request which include migrations
// applying migrations on your staging/ preview database or neon dev branch
// on code merge applying migrations to poduction database