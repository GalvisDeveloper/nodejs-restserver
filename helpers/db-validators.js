
const Role = require('../models/role/role');
// const User = require('../models/user/user');

const checkRole = async (role = '') => {
    const roleExists = await Role.findOne({ role });
    if (!roleExists) {
        throw new Error(`Role '${role}' does not exist`);
    }
}

// const emailRegistered = async (req, res, next) => {
//     const emailExists = await User.findOne({ email });
//     if (emailExists) {
//         return res.status(400).json({
//             msg: `The email ${email} is already in use`
//         })
//     }
//     next();
// }


module.exports = { checkRole
 };