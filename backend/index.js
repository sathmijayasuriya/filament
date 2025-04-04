  const express = require('express');
  const dotenv = require('dotenv');
  const cors = require('cors');
  const categoriesRoutes = require('./routes/categories');
  const postsRoutes = require('./routes/posts');
  const authRoutes = require('./routes/auth');  //JWT

  dotenv.config();

  const app = express();
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/api/categories', categoriesRoutes);
  app.use('/api/posts', postsRoutes);
  app.use('/api/auth', authRoutes);  //JWT


  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
