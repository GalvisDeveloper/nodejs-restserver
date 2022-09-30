const { response } = require('express');

const getUsers = (req, res = response) => {
    res.status(201).json({ msg: 'GET API' });
}

const createUser = (req, res = response) => {
    res.status(201).json({ msg: 'CREATE API' });
}

const updateUser = (req, res = response) => {
    res.status(201).json({ msg: 'PUT API' });
}

const patchUser = (req, res = response) => {
    res.status(201).json({ msg: 'PATCH API' });
}

const deleteUser = (req, res = response) => {
    res.status(201).json({ msg: 'DELETE API' });
}

module.exports = {
    getUsers, updateUser, deleteUser, createUser, patchUser,
}