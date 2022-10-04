
const { response, request } = require('express');
const jwt = require('jsonwebtoken');


const validateJWT = (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        res.status(401).json({
            msg: 'Json web token must be provided'
        })
    }


    try {
        const {uid} = jwt.verify(token, process.env.PRIVATE_KEY);

        req.uid = uid;
        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token provided'
        });
    }

}

module.exports = { validateJWT }