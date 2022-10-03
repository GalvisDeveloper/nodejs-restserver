
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers,
    createUser,
    deleteUser,
    patchUser,
    updateUserById } = require('../controllers/user');
const { checkRole, emailRegistered, checkId } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');


const router = Router();

router.get('/', getUsers);




router.put('/:id', [
    check('id', 'The ID is not valid').isMongoId(),
    check('id').custom(checkId),
    check('role').custom(checkRole),
    validateFields
], updateUserById);

router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email address is not valid').isEmail(),
    check('email').custom(emailRegistered),
    check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
    // check('role', 'The role is not allowed').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(checkRole),
    validateFields
], createUser);

router.delete('/', deleteUser);

router.patch('/', patchUser);

module.exports = router;