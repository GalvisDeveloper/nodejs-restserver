const { response } = require('express');
const { encryptPass } = require('../helpers/encrypt-password');

const User = require('../models/user/user');

const getUsers = async (req, res = response) => {

    const { limit = 2, since = 0 } = req.query;

    const queryUserStatus = { status: true };

    const [total, users] = await Promise.all([
        User.countDocuments(queryUserStatus),
        User.find(queryUserStatus)
            .skip(since)
            .limit(Number(limit))
    ]);

    res.json({ total, users });
}

const createUser = async (req, res = response) => {

    const { name, email, password, role } = req.body;

    // Instance creation
    const user = new User({ name, email, password, role });

    user.password = encryptPass(password);

    // Save user on db
    await user.save();

    console.log(user);
    res.json({ user });
}

const updateUserById = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    if (password) {
        rest.password = encryptPass(password);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    console.log(user);
    res.json(user);
}

const deleteUser = async (req, res = response) => {

    const { id } = req.params;

    // Delete phisically existing user (Not recommended)
    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, { status: false });

    if (!user.status) {
        res.status(400).json({
            msg: 'This user was already deleted',
        })
    }

    res.json( user);
}

const patchUser = (req, res = response) => {
    res.json({ msg: 'PATCH API' });
}

module.exports = {
    getUsers, updateUserById, deleteUser, createUser, patchUser,
}