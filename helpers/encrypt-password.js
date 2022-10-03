
const bcrypt = require('bcryptjs');

const encryptPass = (password) => {

    // Encrypt the password
    /**
     * @salt = number of rounds for the password, to make it harder
     * to decrypt  
     */
    const salt = bcrypt.genSaltSync();
    const result = bcrypt.hashSync(password, salt);

    return result;
}

module.exports = { encryptPass }