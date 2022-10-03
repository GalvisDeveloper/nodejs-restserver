
const Role = require('../models/role/role');
const User = require('../models/user/user');

const checkRole = async (role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
        throw new Error(`Role '${role}' does not exist`);
    }
}

const emailRegistered = async (email = '') => {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`The email ${email} is already in use`);
    }
}


module.exports = { checkRole, emailRegistered };