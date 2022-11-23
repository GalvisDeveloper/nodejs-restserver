const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { checkId } = require('../helpers/db-validators');

const { getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct } = require('../controllers/product');

const router = Router();

// Get all products - public
router.get('/', [
    validateFields
], getAllProducts);


// Get product by Id
router.get('/:id', [
    check('id', 'The ID is not valid').isMongoId(),
    check('id').custom(checkId),
    validateFields,
], getProductById);

// Create a new product - private (TOKEN required)
router.post('/', [
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