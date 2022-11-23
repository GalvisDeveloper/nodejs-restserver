const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '8h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject(`The token cannot be generated`);
            } else {
                resolve(token);
            }
        })

    });

}

module.exports = generateJWT;