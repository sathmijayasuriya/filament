const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/AuthorsController');
const verifyToken = require('../middleware/authMiddleware');

router.use(verifyToken);
router.get('/getall', authorsController.getAllAuthors);
router.get('/names', authorsController.getAllAuthorNames);
router.get('/:id', authorsController.getAuthorById);
router.post('/create', authorsController.createAuthor);
router.put('/update/:id', authorsController.updateAuthor);
router.delete('/delete/:id', authorsController.deleteAuthor);
router.post('/delete-bulk', authorsController.deleteBulkAuthors);

module.exports = router;