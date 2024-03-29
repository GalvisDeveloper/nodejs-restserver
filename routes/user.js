
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers,
    createUser,
    deleteUser,
    patchUser,
    updateUserById,
    getUserById } = require('../controllers/user');

const { checkRole, emailRegistered, checkId } = require('../helpers/db-validators');

const { validateFields, validateJWT, hasRole, isAdmin } = require('../middlewares');

const User = require('../models/user');

const router = Router();

// Get users
router.get('/', getUsers);

// Get user by id
router.get('/:id', [
    check('id', 'The ID is not valid').isMongoId(),
    check('id').custom(checkId, User),
    validateFields,
], getUserById)

// Update user
router.put('/:id', [
    check('id', 'The ID is not valid').isMongoId(),
    check('id').custom(checkId, User),
    check('role').custom(checkRole),
    validateFields
], updateUserById);

// Create user
router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email address is not valid').isEmail(),
    check('email').custom(emailRegistered),
    check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
    // check('role', 'The role is not allowed').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(checkRole),
    validateFields
], createUser);

// Delete user
router.delete('/:id', [
    validateJWT,
    // isAdmin,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'The ID is not valid').isMongoId(),
    check('id').custom(checkId, User),
    validateFields
], deleteUser);

// Partial update route
router.patch('/', patchUser);

module.exports = router;