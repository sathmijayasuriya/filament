const { db,links } = require('../db'); // Import Drizzle and schema
const { eq, sql, and, gte, lte } = require('drizzle-orm');
const path = require("path");

//get all

exports.getAllLinks = async (req, res) => {
    try {
        const allLinks = await db
            .select({
                id: links.id,
                title: links.title,
                color: links.color,
                description: links.description,
                url: links.url,
                image: links.image,
                created_at: links.created_at,
                updated_at: links.updated_at,
            })
            .from(links);

        const baseUrl = `${req.protocol}://${req.get('host')}`;

        const linksWithImageUrls = allLinks.map(link => {
            const normalizedImagePath = link.image ? link.image.replace(/\\/g, "/") : null;
            return {
                ...link,
                image: normalizedImagePath ? `${baseUrl}/${normalizedImagePath}` : null,
            };
        });

        res.json(linksWithImageUrls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// create link
exports.createLink = async (req, res) => {
    try {
        const { title, color, description, url } = req.body;
        const image = req.file ? req.file.path : null; // Store relative path like 'uploads/image.jpg'

        const result = await db.insert(links).values({
            title,
            color,
            description,
            url,
            image,
        });

        res.status(201).json({ message: "Link created", result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// edit link
exports.editLink = async (req, res) => {
    const { id } = req.params;
    const { title, color, description, url, existingImage } = req.body;
    const newImage = req.file ? req.file.path : null;

    try {
        const currentLink = await db.select().from(links).where(eq(links.id, id)).limit(1);

        if (currentLink.length === 0) {
            return res.status(404).json({ error: 'Link not found' });
        }

        const image = newImage || existingImage || currentLink[0].image;

        const updatedLink = await db.update(links)
            .set({ title, color, description, url, image })
            .where(eq(links.id, id));

        res.status(200).json(updatedLink);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// delete link
exports.deleteLink = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedLink = await db.delete(links).where(eq(links.id, id));
        res.status(200).json(deletedLink);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// get link by id
exports.getLinkById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db
            .select({
                id: links.id,
                title: links.title,
                color: links.color,
                description: links.description,
                url: links.url,
                image: links.image,
                created_at: links.created_at,
                updated_at: links.updated_at,
            })
            .from(links)
            .where(eq(links.id, id))
            .limit(1);

        if (result.length === 0) {
            return res.status(404).json({ error: "Link not found" });
        }

        const link = result[0];
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const normalizedImagePath = link.image ? link.image.replace(/\\/g, "/") : null;

        res.status(200).json({
            ...link,
            image: normalizedImagePath ? `${baseUrl}/${normalizedImagePath}` : null,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
