const { response } = require('express');

const Product = require('../models/product');

const getAllProducts = async (req, res = response) => {

    try {
        const { limit = 2, since = 0 } = req.query;

        const queryStatus = { status: true };

        const [total, products] = await Promise.all([
            Product.countDocuments(queryStatus),
            Product.find(queryStatus)
                .populate('user', 'name')
                .populate('category', 'name')
                .skip(since).limit(Number(limit))
        ])

        res.status(200).json({
            total,
            products
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Internal Server Error',
        })
    }

}

const getProductById = async (req, res = response) => {

    const { id } = req.param;

    console.log("JOIN");

    res.status(200).json({
        msg: 'Everything works - GET BY ID',
    })
}

const createProduct = async (req, res = response) => {
    // Getting name from body
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;

    const productDb = await Product.findOne({ name })

    // Verify if it exists
    if (productDb) {
        res.status(400).json({
            msg: `Category ${productDb?.name} has already exists`,
        })
    }

    try {
        // Data to send
        const data = {
            name,
            user: req.user._id,
            category: req.category._id,
            description: description || "",
            price: price || 0,
        }

        // Save to db
        const product = new Product(data);
        await product.save();

        res.status(201).json(product);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Internal Server error"
        })
    }
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