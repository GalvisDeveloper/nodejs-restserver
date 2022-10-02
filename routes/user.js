
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers,
    createUser,
    deleteUser,
    patchUser, 
    updateUserById} = require('../controllers/user');

const router = Router();

router.get('/', getUsers);

router.put('/updateById/:id', updateUserById);

router.post('/', [
    check('email', 'The email address is not valid').isEmail(),
], createUser);

router.delete('/', deleteUser);

router.patch('/', patchUser);

module.exports = router;