
const { Router } = require('express');
const { getUsers,
    updateUser,
    createUser,
    deleteUser,
    patchUser } = require('../controllers/user');

const router = Router();

router.get('/', getUsers);

router.put('/', updateUser);

router.post('/', createUser);

router.delete('/', deleteUser);

router.patch('/', patchUser);

module.exports = router;