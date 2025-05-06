const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db, users } = require('../db'); // Import Drizzle and users table
const { eq } = require('drizzle-orm');

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(users).values({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const foundUsers = await db.select().from(users).where(eq(users.username, username));
    const user = foundUsers[0];
    console.log('User:', user); 
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
  
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};