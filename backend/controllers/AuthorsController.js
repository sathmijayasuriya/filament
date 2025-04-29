const { db, authors } = require("../db");
const { eq, sql } = require("drizzle-orm");

//get all authors
exports.getAllAuthors = async (req, res) => {
    try {
        const allAuthors = await db.select().from(authors);
        res.json(allAuthors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}; 

// get all author names
exports.getAllAuthorNames = async (req, res) => {
    try {
        const authorNames = await db
            .select({ id: authors.id, name: authors.name })
            .from(authors)
            .orderBy(authors.name);
        res.json(authorNames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// get author by mail
exports.getAuthorById = async (req, res) => {
    const { email } = req.params;
    try {
        const author = await db
            .select()
            .from(authors)
            .where(eq(authors.id, id));
        if (author.length === 0) {
            return res.status(404).json({ error: "Author not found" });
        }
        res.json(author[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// create author
exports.createAuthor = async (req, res) => {
    const { name, email, bio, github_handle, twitter_handle } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }

    try {
        // Check for existing mail
        const existing = await db.select().from(authors).where(eq(authors.email, email));
        if (existing.length > 0) {
            return res.status(400).json({ error: "Author with this email already exists" });
        }
        const now = new Date();
        const newAuthor = {
            name,
            email,
            bio,
            github_handle,
            twitter_handle,
            created_at: now,
            updated_at: now,
        };
        console.log('Author:', newAuthor); 
        await db.insert(authors).values(newAuthor);
        res.status(201).json({ message: "Author created", author: newAuthor });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

//update author
exports.updateAuthor = async (req, res) => {
    const { id } = req.params;
    const { name, email, bio, github_handle, twitter_handle } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }

    try {
        const now = new Date();
        const updatedAuthor = {
            name,
            email,
            bio,
            github_handle,
            twitter_handle,
            updated_at: now,
        };
        await db.update(authors).set(updatedAuthor).where(eq(authors.id, id));
        res.status(200).json({ message: "Author updated", author: updatedAuthor });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

//delete author
exports.deleteAuthor = async (req, res) => {
    const { id } = req.params;
    try {
        await db.delete(authors).where(eq(authors.id, id));
        res.status(200).json({ message: "Author deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}