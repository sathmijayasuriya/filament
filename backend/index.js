  const express = require('express');
  const dotenv = require('dotenv');
  const cors = require('cors');
  const categoriesRoutes = require('./routes/categories');
  const postsRoutes = require('./routes/posts');
  const authRoutes = require('./routes/auth');  //JWT
  const authorsRoutes = require('./routes/authors'); 
  const linksRoutes = require('./routes/links');
  const path = require('path'); 

  dotenv.config();

  const app = express();
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/api/categories', categoriesRoutes);
  app.use('/api/posts', postsRoutes);
  app.use('/api/auth', authRoutes); 
  app.use('/api/authors', authorsRoutes);
  app.use('/api/links', linksRoutes);
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));


  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
