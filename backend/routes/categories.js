const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/CategoriesController');
const verifyToken = require('../middleware/authMiddleware');

router.use(verifyToken);
router.get('/',categoriesController.getAllCategories);
router.get('/names', categoriesController.getAllCategoryNames);
router.get('/:slug', categoriesController.getCategoryBySlug);
router.post('/create',categoriesController.createCategory);
router.put('/:slug',categoriesController.updateCategory);
router.delete('/delete/:slug', categoriesController.deleteCategory);

module.exports = router;