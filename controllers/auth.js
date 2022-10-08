const { response } = require('express');

const bcryptjs = require('bcryptjs');

const User = require('../models/user/user');
const generateJWT = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verify if the email exist
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                msg: "User / Password is not correct",
            })
        }

        // User has status active or true
        if (!user.status) {
            return res.status(400).json({
                msg: "User is no longer active",
            })
        }

        // Verify password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Password is incorrect",
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({ user, token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error })
    }

}

const signInGoogle = async (req, res = response) => {

    const { id_token } = req.body;

    try {

        const { name, email, img } = await googleVerify(id_token);

        console.log(id_token);

        res.json({
            id_token,
            name,
            email,
            img
        });

    } catch (err) {
        console.log(err)
        res.status(400).json({
            msg: 'We cannot verify the token',
        })
    }
}

module.exports = {
    login, signInGoogle
}