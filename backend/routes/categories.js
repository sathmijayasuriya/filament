const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken,categoriesController.getAllCategories);
router.get('/names',verifyToken, categoriesController.getAllCategoryNames);
router.get('/:slug',verifyToken, categoriesController.getCategoryBySlug);
router.post('/create', verifyToken,categoriesController.createCategory);
router.put('/:slug', verifyToken,categoriesController.updateCategory);
router.delete('/delete/:slug',verifyToken, categoriesController.deleteCategory);

module.exports = router;