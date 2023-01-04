
const Category = require('../models/category');
const Role = require('../models/role');
const User = require('../models/user');

const checkRole = async (role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists && role !== '') {
        throw new Error(`Role '${role}' doesn't exist`);
    }
}

const emailRegistered = async (email = '') => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`The email ${email} is already in use`);
    }
}

const checkId = async (id, model) => {
    const idExists = await model.findById(id);
    if (!idExists) {
        throw new Error(`There is not an item with id -> ${id}`);
    }
}

// const checkIdUser = async (id) => {
//     const idExists = await User.findById(id);
//     if (!idExists) {
//         throw new Error(`There is not a user with id -> ${id}`);
//     }
// };

// const checkIdCategory = async (id) => {
//     const idExists = await Category.findById(id);
//     if (!idExists) {
//         throw new Error(`There is not a category with id -> ${id}`);
//     }
// }

module.exports = { checkRole, emailRegistered, checkId };