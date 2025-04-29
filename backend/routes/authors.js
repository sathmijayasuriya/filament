const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/AuthorsController');
const verifyToken = require('../middleware/authMiddleware');

router.use(verifyToken);
router.get('/getall', authorsController.getAllAuthors);
router.get('/names', authorsController.getAllAuthorNames);
router.get('/:slug', authorsController.getAuthorBySlug);
router.post('/create', authorsController.createAuthor);
router.put('/update/:slug', authorsController.updateAuthor);
router.delete('/delete/:slug', authorsController.deleteAuthor);

module.exports = router;