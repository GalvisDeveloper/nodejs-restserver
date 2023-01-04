const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares');

const { checkId } = require('../helpers/db-validators');

const { getAllCategories,
    getCategoryById,
    createCategory,
    deleteCategory,
    updateCategory } = require('../controllers/category');    

const Category = require('../models/category');

const router = Router();

// Get all categories - public
router.get('/', getAllCategories);

// Get category by Id
router.get('/:id', [
    check('id', 'The ID is not valid').isMongoId(),
    validateFields,
    check('id').custom(checkId, Category),
], getCategoryById);

// Create a new category - private (TOKEN required)
router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    validateFields,
], createCategory);

// Delete a category - private (TOKEN required)
router.delete('/:id', [
    validateJWT,
    check('id', 'The ID is not valid').isMongoId(),
    check('id').custom(checkId, Category),
    validateFields,
], deleteCategory);

// Update a category - private (TOKEN required)
router.put('/:id', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('id', 'The ID is not valid').isMongoId(),
    check('id').custom(checkId, Category),
    validateFields,
], updateCategory);



module.exports = router;