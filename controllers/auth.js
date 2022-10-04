const { response } = require('express');

const bcryptjs = require('bcryptjs');

const User = require('../models/user/user');
const generateJWT = require('../helpers/generate-jwt');

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

module.exports = {
    login,
}