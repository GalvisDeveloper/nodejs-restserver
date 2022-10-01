const { response } = require('express');

const getUsers = (req, res = response) => {

    const {q, name = "No name", age} = req.query;

    console.log(q)
    
    res.status(201).json({ msg: 'GET API', q, name, age });
}

const createUser = (req, res = response) => {
    const {name, age} = req.body;
    res.status(201).json({ msg: 'CREATE API', name, age });
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