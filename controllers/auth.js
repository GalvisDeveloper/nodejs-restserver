const { response } = require('express');

const User = require('../models/user/user');

const login = (req, res = response) => {
    res.json({ algo: 'algo' });
}

module.exports = {
    login,
}