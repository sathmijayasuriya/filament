const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postController');

router.get('/posts', postsController.getAllPosts);
router.get('/:slug', postsController.getPostBySlug);
router.post('/create', postsController.createPost);
router.put('/:slug', postsController.updatePost);
router.delete('/delete/:slug', postsController.deletePost);

module.exports = router;
