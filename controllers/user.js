const { response } = require('express');

const User = require('../models/user/user');

const getUsers = (req, res = response) => {

    const { q, name = "No name", age } = req.query;

    console.log(q)

    res.status(201).json({ msg: 'GET API', q, name, age });
}

const createUser = async (req, res = response) => {
    const body = req.body;

    // Instance creation
    const user = new User(body);

    // Save user on db
    await user.save();

    console.log(user)
    res.json({ user });
}

const updateUserById = (req, res = response) => {

    const id = req.params.id;

    console.log(id);

    res.status(201).json({ msg: 'PUT API', id });
}

const patchUser = (req, res = response) => {
    res.status(201).json({ msg: 'PATCH API' });
}

const deleteUser = (req, res = response) => {
    res.status(201).json({ msg: 'DELETE API' });
}

module.exports = {
    getUsers, updateUserById, deleteUser, createUser, patchUser,
}