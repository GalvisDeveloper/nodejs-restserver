const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { checkId } = require('../helpers/db-validators');

const { getAllCategories,
    getCategoryById,
    createCategory,
    deleteCategory,
    updateCategory } = require('../controllers/category');
const { validateJWT } = require('../middlewares');

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
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    validateFields,
], createCategory);

// Delete a category - private (TOKEN required)
router.delete('/:id', [
    check('id', 'The ID is not valid').isMongoId(),
    check('id').custom(checkId),
    validateFields,
], deleteCategory);

// Update a category - private (TOKEN required)
router.put('/:id', [
    validateFields,
], updateCategory);



module.exports = router;