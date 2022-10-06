
const Role = require('../models/role/role');
const User = require('../models/user/user');

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

const checkId = async (id) => {
    const idExists = await User.findById( id );
    if (!idExists) {
        throw new Error(`There is not a user with id -> ${id}`);
    }
};

module.exports = { checkRole, emailRegistered, checkId };