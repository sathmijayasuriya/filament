const slugify = require('slugify');
const pool = require('../db');

// Get All Posts (With Filtering)
exports.getAllPosts = async (req, res) => {
    try {
        const { from, to } = req.query;
        let query = `
            SELECT 
                posts.id, 
                posts.title, 
                posts.slug AS post_slug, 
                posts.content, 
                posts.image_path, 
                posts.tags, 
                posts.published_at, 
                posts.status, 
                posts.created_at, 
                posts.updated_at, 
                categories.name AS category_name
            FROM posts
            LEFT JOIN categories ON posts.category_id = categories.id
            WHERE 1=1
        `;
        let params = [];

        if (from) {
            // Convert 'from' to a valid TIMESTAMP format
            const fromTimestamp = new Date(from);
            query += " AND posts.published_at >= ?";
            params.push(fromTimestamp);
        }
        if (to) {
            // Convert 'to' to a valid TIMESTAMP format
            const toTimestamp = new Date(to);
            query += " AND posts.published_at <= ?";
            params.push(toTimestamp);
        }

        console.log("Query:", query);
        console.log("Params:", params);
        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a Single Post by Slug
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

//  Create a New Post
exports.createPost = async (req, res) => {
    const { title, content, category_id, image_path, tags, published_at } = req.body;
    const slug = slugify(title, { lower: true });

    console.log("Received published_at:", published_at);
    const status = published_at && published_at.trim() !== "" ? 'published' : 'draft';

    try {
        const [existing] = await pool.query("SELECT * FROM posts WHERE slug = ?", [slug]);
        if (existing.length > 0) return res.status(400).json({ error: 'Slug already exists' });

        // Insert the post into the database
        await pool.query(
            "INSERT INTO posts (title, slug, content, category_id, image_path, tags, published_at, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [title, slug, content, category_id, image_path, JSON.stringify(tags), published_at || null, status]
        );

        res.status(201).json({ message: 'Post created', status });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//  Update a Post
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

//  Delete a Post
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
//ongoing