const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.findAll);
router.get('/:id', ProductController.find);
router.post('/', ProductController.create);
router.patch('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

module.exports = router
