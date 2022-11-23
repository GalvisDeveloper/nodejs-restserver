const { response } = require('express');

const Product = require('../models/product');

const getAllProducts = async (req, res = response) => {
    res.status(200).json({
        msg: 'Everything works',
    })
}

const getProductById = async (req, res = response) => {
    res.status(200).json({
        msg: 'Everything works - GET BY ID',
    })
}

const createProduct = async (req, res = response) => {
    res.status(200).json({
        msg: 'Everything works - POST',
    })
}

const deleteProduct = async (req, res = response) => {
    res.status(200).json({
        msg: 'Everything works - DELETE',
    })
}

const updateProduct = async (req, res = response) => {
    res.status(200).json({
        msg: 'Everything works - UPDATE',
    })
}

module.exports = {
    getAllProducts, getProductById, createProduct,
    deleteProduct, updateProduct,
}