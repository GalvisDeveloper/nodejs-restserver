const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { checkId } = require('../helpers/db-validators');

const { getAllCategories,
    getCategoryById,
    createCategory,
    deleteCategory,
    updateCategory } = require('../controllers/category');

const router = Router();


// Get all categories - public
router.get('/', [
    validateFields
], getAllCategories);

// Get category by Id
router.get('/:id', [
    check('id', 'The ID is not valid').isMongoId(),
    check('id').custom(checkId),
    validateFields,
], getCategoryById);

// Create a new category - private (TOKEN required)
router.post('/', [
    validateFields,
], createCategory);

// Delete a category - private (TOKEN required)
router.delete('/', [
    validateFields,
], deleteCategory);

// Update a category - private (TOKEN required)
router.put('/', [
    validateFields,
], updateCategory);



module.exports = router;