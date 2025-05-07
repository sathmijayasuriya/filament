const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const linksController = require('../controllers/LinksController');
const upload = require("../middleware/upload");

router.use(verifyToken);
router.get('/getAll',linksController.getAllLinks);
router.get('/:id', linksController.getLinkById);
router.post("/create", upload.single("image"), linksController.createLink);
router.put('/update/:id', upload.single("image"),linksController.editLink);
router.delete('/delete/:id', linksController.deleteLink);

module.exports = router;