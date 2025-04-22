const express = require('express');
const router = express.Router();
const postsController = require('../controllers/PostController');
const verifyToken = require('../middleware/authMiddleware');


router.use(verifyToken);
router.get('/posts',postsController.getAllPosts);
router.get('/view/:slug', postsController.getPostBySlug);
router.post('/create', postsController.createPost);
router.put('/edit/:slug', postsController.updatePost);
router.delete('/delete/:slug', postsController.deletePost);

module.exports = router;
