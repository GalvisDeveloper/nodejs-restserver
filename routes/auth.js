
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');


const router = Router();

// Post login
router.post('/login', [
    check('email', 'The email address is not valid').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields
], login);


module.exports = router;