
const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user/user');


const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        res.status(401).json({
            msg: 'Json web token must be provided'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);

        const user = await User.findById(uid);

        if (!user) {
            return res.status(400).json({
                msg: "There is no user with that uid",
            });
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'The user authenticated is no longer active',
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({
            msg: 'The token has expired or was invalid',
        });
    }

}

module.exports = { validateJWT }