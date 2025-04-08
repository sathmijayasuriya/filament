const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/posts', verifyToken,postsController.getAllPosts);
router.get('/view/:slug',verifyToken, postsController.getPostBySlug);
router.post('/create',verifyToken, postsController.createPost);
router.put('/edit/:slug',verifyToken, postsController.updatePost);
router.delete('/delete/:slug',verifyToken, postsController.deletePost);

module.exports = router;
