const slugify = require('slugify');
const { pool } = require('../index');

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

//Get All Category Names
exports.getAllCategoryNames = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT name FROM categories');
        const names = rows.map(row => row.name);
        res.json(names);
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
  const { name, visibility } = req.body;
  const slug = slugify(name, { lower: true });
  try {
    const [existing] = await pool.query('SELECT * FROM categories WHERE slug = ?', [slug]);
    if (existing.length > 0) {
        return res.status(400).json({error: 'Slug already exists'});
    }
    await pool.query('INSERT INTO categories (name, slug, visibility) VALUES (?, ?, ?)', [name, slug, visibility]);
    res.status(201).json({ message: 'Category created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  const { slug } = req.params;
  const { name, visibility } = req.body;
  const newSlug = slugify(name, { lower: true });

  try {
    const [existing] = await pool.query('SELECT * FROM categories WHERE slug = ? AND slug != ?', [newSlug, slug]);
    if (existing.length > 0) {
        return res.status(400).json({error: 'Slug already exists'});
    }

    await pool.query('UPDATE categories SET name = ?, slug = ?, visibility = ? WHERE slug = ?', [name, newSlug, visibility, slug]);
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