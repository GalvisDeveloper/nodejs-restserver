const { response } = require('express');

const Category = require('../models/category');

const getAllCategories = async (req, res = response) => {

    const { limit = 3, since = 0 } = req.query;

    const queryStatus = { status: true }

    const [total, categories] = await Promise.all([
        Category.countDocuments(queryStatus),
        Category.find(queryStatus).populate("user", "name").skip(since).limit(Number(limit))
    ]);

    res.status(200).json({ total, categories })
}

const getCategoryById = async (req, res = response) => {

    try {
        const { id } = req.params;
        const category = await Category.findById(id).populate('user', 'name');
        res.status(200).json(category)
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Internal Server Error",
        })
    }

}

const createCategory = async (req, res = response) => {

    // Getting name from body
    const name = req.body.name.toUpperCase();

    const categoryDb = await Category.findOne({ name })

    // Verify if it exists
    if (categoryDb) {
        res.status(400).json({
            msg: `Category ${categoryDb?.name} has already exists`,
        })
    }

    try {
        // Data to send
        const data = {
            name,
            user: req.user._id,
            // status: true,
        }

        // Save to db
        const category = new Category(data);
        await category.save();

        res.status(201).json(category);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Internal Server error"
        })
    }

}

const deleteCategory = async (req, res = response) => {

    try {
        const { id } = req.params;

        const category = await Category.findByIdAndUpdate(id, { status: false }).populate("user", "name");

        if (category.status) {
            return res.status(200).json({
                mgs: "Category deleted successfully",
                category: category.name,
            })
        }

        res.status(404).json({
            msg: "This category doesn't exist or it has been deleted already"
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Server Error",
        })
    }
}

const updateCategory = async (req, res = response) => {

    try {
        const { id } = req.params;
        const { _id, status, user, ...body } = req.body;

        body.name = body.name.toUpperCase();
        body.user = req.user._id;

        // Check if there's another category with the same name 
        const checkCategory = await Category.findOne({ name: body.name });

        if (checkCategory) {
            return res.status(400).json({
                msg: "There's a category with the same name",
            })
        }

        // Check if this user is allowed to update this category
        const itExist = await Category.findById(id);

        if (body.user.toString() !== itExist.user.toString()) {
            return res.status(401).json({
                msg: "You are not allowed to modify this category"
            })
        }

        const category = await Category.findByIdAndUpdate(id, body, { new: true });

        return res.status(200).json({
            msg: "Category updated",
            category
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Server Error",
        })
    }
}

module.exports = {
    getAllCategories, getCategoryById, createCategory,
    deleteCategory, updateCategory,
}