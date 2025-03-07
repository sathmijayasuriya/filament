const slugify = require('slugify');
const pool = require('../db'); 

// Get All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get All Category Names
exports.getAllCategoryNames = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name FROM categories ORDER BY name ASC');
    res.json(rows); // Return full objects with id and name
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Category by Slug
exports.getCategoryBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM categories WHERE slug = ?', [slug]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create Category
exports.createCategory = async (req, res) => {
  const { name, visibility, description } = req.body;
  const slug = slugify(name, { lower: true });

  // Check if the slug already exists 
  try {
    const [existing] = await pool.query('SELECT * FROM categories WHERE slug = ?', [slug]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Slug already exists' });
    }
    await pool.query('INSERT INTO categories (name, slug, visibility, description) VALUES (?, ?, ?, ?)', [name, slug, visibility, description]);
    res.status(201).json({ message: 'Category created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  const { slug } = req.params;
  const { name, visibility, description } = req.body;
  const newSlug = slugify(name, { lower: true });

  try {
    const [existing] = await pool.query('SELECT * FROM categories WHERE slug = ? AND slug != ?', [newSlug, slug]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Slug already exists' });
    }

    await pool.query('UPDATE categories SET name = ?, slug = ?, visibility = ?, description = ? WHERE slug = ?', [name, newSlug, visibility, description, slug]);
    res.json({ message: 'Category updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  const { slug } = req.params;
  try {
    await pool.query('DELETE FROM categories WHERE slug = ?', [slug]);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
