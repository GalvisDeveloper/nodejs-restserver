const { response } = require('express');

const Category = require('../models/category');

const getAllCategories = async (req, res = response) => {
    res.status(200).json({
        msg: 'Everything works - GET',
    })
}

const getCategoryById = async (req, res = response) => {
    res.status(200).json({
        msg: 'Everything works - GET BY ID',
    })
}

const createCategory = async (req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoryDb = await Category.findOne({ name })

    if (categoryDb) {
        res.status(400).json({
            msg: `Category ${categoryDb?.name} has already exists`,
        })
    }

    // Data to send
    const data = {
        name,
        user: req.user._id
    }

    res.status(200).json({
        msg: 'Everything works - POST',
    })
}

const deleteCategory = async (req, res = response) => {
    res.status(200).json({
        msg: 'Everything works - DELETE',
    })
}

const updateCategory = async (req, res = response) => {
    res.status(200).json({
        msg: 'Everything works - UPDATE',
    })
}

module.exports = {
    getAllCategories, getCategoryById, createCategory,
    deleteCategory, updateCategory,
}