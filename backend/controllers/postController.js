const slugify = require('slugify');
const pool = require('../db');

// 🔹 Get All Posts (With Filtering)
exports.getAllPosts = async (req, res) => {
    try {
        const { from, to } = req.query;
        let query = "SELECT * FROM posts WHERE 1=1";
        let params = [];

        if (from && to) {
            query += " AND published_at BETWEEN ? AND ?";
            params.push(from, to);
        }

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 🔹 Get a Single Post by Slug// 🔹 Get a Single Post by Slug with Category Name
exports.getPostBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const [rows] = await pool.query(`
            SELECT 
                posts.*, 
                categories.name AS category_name 
            FROM posts 
            LEFT JOIN categories ON posts.category_id = categories.id
            WHERE posts.slug = ?
        `, [slug]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 🔹 Create a New Post
exports.createPost = async (req, res) => {
    const { title, content, category_id, image_path, tags, published_at } = req.body;
    const slug = slugify(title, { lower: true });
    
    try {
        // Ensure slug is unique
        const [existing] = await pool.query("SELECT * FROM posts WHERE slug = ?", [slug]);
        if (existing.length > 0) return res.status(400).json({ error: 'Slug already exists' });

        await pool.query(
            "INSERT INTO posts (title, slug, content, category_id, image_path, tags, published_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [title, slug, content, category_id, image_path, JSON.stringify(tags), published_at || null]
        );
        res.status(201).json({ message: 'Post created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 🔹 Update a Post
exports.updatePost = async (req, res) => {
    const { slug } = req.params;
    const { title, content, category_id, image_path, tags, published_at } = req.body;
    const newSlug = slugify(title, { lower: true });

    try {
        // Ensure unique slug
        const [existing] = await pool.query("SELECT * FROM posts WHERE slug = ? AND slug != ?", [newSlug, slug]);
        if (existing.length > 0) return res.status(400).json({ error: 'Slug already exists' });

        await pool.query(
            "UPDATE posts SET title = ?, slug = ?, content = ?, category_id = ?, image_path = ?, tags = ?, published_at = ? WHERE slug = ?",
            [title, newSlug, content, category_id, image_path, JSON.stringify(tags), published_at || null, slug]
        );
        res.json({ message: 'Post updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 🔹 Delete a Post
exports.deletePost = async (req, res) => {
    const { slug } = req.params;
    try {
        await pool.query("DELETE FROM posts WHERE slug = ?", [slug]);
        res.json({ message: 'Post deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
