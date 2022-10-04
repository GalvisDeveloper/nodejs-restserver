
const { request, response } = require('express');
const Role = require('../models/role/role');


const isAdmin = async (req = request, res = response, next) => {


    if (!req.user) {
        return res.status(500).json({
            msg: 'There is no a token provided to verify the role'
        })
    }

    const { role, name } = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `'${name}' is not an administrator, so he can't delete a user`
        })
    }

    next();

}

module.exports = { isAdmin };