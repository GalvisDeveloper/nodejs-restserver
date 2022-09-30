
const { Router } = require('express');
const { getUsers,
    createUser,
    deleteUser,
    patchUser, 
    updateUserById} = require('../controllers/user');

const router = Router();

router.get('/', getUsers);

router.put('/updateById/:id', updateUserById);

router.post('/', createUser);

router.delete('/', deleteUser);

router.patch('/', patchUser);

module.exports = router;