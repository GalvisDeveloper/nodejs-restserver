const { response } = require('express');


const Category = require('../models/category/category');

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