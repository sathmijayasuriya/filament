const bcrypt = require('bcrypt');
const { db } = require('../db'); // adjust path
const { users } = require('../db/schema/schema'); // adjust path

async function seedUser() {
  const hashedPassword = await bcrypt.hash('admin', 10);
  await db.insert(users).values({
    username: 'admin@filamentphp.com',
    password: hashedPassword,
  });
  console.log('Admin user seeded');
}

seedUser().then(() => process.exit());
