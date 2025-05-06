const slugify = require('slugify');
const { db, posts, categories } = require('../db'); // Import Drizzle and schema
const { eq, sql, and, gte, lte } = require('drizzle-orm');

// Get All Posts (With Filtering)
exports.getAllPosts = async (req, res) => {
  try {
    const { from, to } = req.query;
    let query = db
      .select({
        id: posts.id,
        title: posts.title,
        post_slug: posts.slug,
        content: posts.content,
        image_path: posts.image_path,
        tags: posts.tags,
        published_at: posts.published_at,
        status: posts.status,
        created_at: posts.created_at,
        updated_at: posts.updated_at,
        category_name: categories.name,
      })
      .from(posts)
      .leftJoin(categories, eq(posts.category_id, categories.id));

    let conditions = [];

    if (from) {
      conditions.push(gte(posts.published_at, new Date(from)));
    }
    if (to) {
      conditions.push(lte(posts.published_at, new Date(to)));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const allPosts = await query;
    res.json(allPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a Single Post by Slug
exports.getPostBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await db
      .select({
        ...posts,
        category_name: categories.name,
      })
      .from(posts)
      .leftJoin(categories, eq(posts.category_id, categories.id))
      .where(eq(posts.slug, slug));

    if (post.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a New Post
exports.createPost = async (req, res) => {
  const { title, content, category_id, image_path, tags, published_at } = req.body;
  const slug = slugify(title, { lower: true });

  const status = published_at && published_at.trim() !== '' ? 'published' : 'draft';

  let publishedAtDate = null;

  if (published_at) {
    publishedAtDate = new Date(published_at); // Parse the string to a Date object
    if (isNaN(publishedAtDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format for published_at' });
    }
  }

  try {
    const existing = await db.select().from(posts).where(eq(posts.slug, slug));
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Slug already exists' });
    }

    await db
      .insert(posts)
      .values({
        title,
        slug,
        content,
        category_id,
        image_path,
        tags: JSON.stringify(tags),
        published_at: publishedAtDate,
        status,
      });

    res.status(201).json({ message: 'Post created', status });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a Post
exports.updatePost = async (req, res) => {
  const { slug } = req.params;
  const { title, content, category_id, image_path, tags, published_at } = req.body;
  const newSlug = slugify(title, { lower: true });

  const status = published_at ? 'published' : 'draft';
  const publishedAtParsed = published_at ? new Date(published_at) : null;

  try {
    const existing = await db.select().from(posts).where(and(eq(posts.slug, newSlug), sql`${posts.slug} != ${slug}`));
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Slug already exists' });
    }

    await db
      .update(posts)
      .set({
        title,
        slug: newSlug,
        content,
        category_id,
        image_path,
        tags: JSON.stringify(tags),
        published_at: publishedAtParsed,
        status: status,
      })
      .where(eq(posts.slug, slug));

    res.json({ message: 'Post updated' });
    console.log('Post updated:', { title, content, category_id, image_path, tags, published_at: publishedAtParsed, status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Delete a Post
exports.deletePost = async (req, res) => {
  const { slug } = req.params;
  try {
    await db.delete(posts).where(eq(posts.slug, slug));
    res.json({ message: 'Post deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};