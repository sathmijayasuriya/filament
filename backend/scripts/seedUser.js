const bcrypt = require('bcryptjs');
const { db } = require('../db'); 
const { users } = require('../db/schema/schema'); 

async function seedUser() {
  const hashedPassword = await bcrypt.hash('admin', 10);  //password 'admin' with a salt rounds of 10
  await db.insert(users).values({
    username: 'admin@filamentphp.com',
    password: hashedPassword,
  });
  console.log('Admin user seeded');
}

seedUser().then(() => process.exit());


// run -> node scripts/seedUser.js
// run explicitly to populate your database with initial data.
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc0NDE2Njc2OSwiZXhwIjoxNzQ0NzcxNTY5fQ.JehOph8E58ss-j5UTcqZ8YYXc-nMNrzCE_CmLV2iGIY"
