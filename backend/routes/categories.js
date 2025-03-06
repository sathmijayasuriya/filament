const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.get('/', categoriesController.getAllCategories);
router.get('/names', categoriesController.getAllCategoryNames);
router.get('/:slug', categoriesController.getCategoryBySlug);
router.post('/', categoriesController.createCategory);
router.put('/:slug', categoriesController.updateCategory);
router.delete('/:slug', categoriesController.deleteCategory);

module.exports = router;