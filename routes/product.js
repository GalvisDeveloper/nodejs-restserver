const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares');

const { checkId } = require('../helpers/db-validators');

const { getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct } = require('../controllers/product');

const Product = require('../models/product');

const router = Router();

// Get all products - public
router.get('/', [
    validateFields
], getAllProducts);


// Get product by Id
router.get('/:id', [
    check('id', 'The ID is not valid').isMongoId(),
    validateFields,
    check('id').custom(checkId, Product),
], getProductById);

// Create a new product - private (TOKEN required)
router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    validateFields,
], createProduct);

// Delete a product - private (TOKEN required)
router.delete('/', [
    validateFields,
], deleteProduct);

// Update a product - private (TOKEN required)
router.put('/:id', [
    validateFields,
], updateProduct);


module.exports = router;