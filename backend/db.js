const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const { drizzle } = require('drizzle-orm/mysql2');
const { categories, posts ,users,authors} = require('./db/schema/schema');

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = drizzle(pool, 
            { schema: { categories, posts,users,authors },mode: 'default', });


module.exports = { db, pool, categories, posts, users,authors }; 

// module.exports = {
//   pool,
//   testConnection,
// };
