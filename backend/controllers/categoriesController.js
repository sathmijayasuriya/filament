const slugify = require("slugify");
const { db, categories } = require("../db");
const { eq, sql } = require("drizzle-orm");

// Get All Categories
exports.getAllCategories = async (req, res) => {
    try {
        const allCategories = await db.select().from(categories);
        res.json(allCategories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get All Category Names
exports.getAllCategoryNames = async (req, res) => {
    try {
        const categoryNames = await db
            .select({ id: categories.id, name: categories.name })
            .from(categories)
            .orderBy(categories.name);
        res.json(categoryNames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get Category by Slug
exports.getCategoryBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const category = await db
            .select()
            .from(categories)
            .where(eq(categories.slug, slug));
        if (category.length === 0) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json(category[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Create Category
exports.createCategory = async (req, res) => {
  const { name, visibility, description } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const slug = slugify(name, { lower: true });

  try {
    // Check for existing slug
    const existing = await db.select().from(categories).where(eq(categories.slug, slug));
    if (existing.length > 0) {
      return res.status(400).json({ error: "Slug already exists" });
    }

    const now = new Date();

    await db.insert(categories).values({
      name,
      slug,
      visibility,
      description,
      created_at: now,
      updated_at: now, // set explicitly on insert
    });

    res.status(201).json({ message: "Category created" });
  } catch (error) {
    console.error("Create Category Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
    const { slug } = req.params;
    const { name, visibility, description } = req.body;
    const newSlug = slugify(name, { lower: true });

    try {
        const existing = await db
            .select()
            .from(categories)
            .where(
                sql`${categories.slug} = ${newSlug} AND ${categories.slug} != ${slug}`
            );
        if (existing.length > 0) {
            return res.status(400).json({ error: "Slug already exists" });
        }
        await db
            .update(categories)
            .set({ name, slug: newSlug, visibility, description })
            .where(eq(categories.slug, slug));
        res.json({ message: "Category updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
    const { slug } = req.params;
    try {
        await db.delete(categories).where(eq(categories.slug, slug));
        res.json({ message: "Category deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
