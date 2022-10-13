
const { Schema, model } = require('mongoose')

const CategorySchema = Schema({

    name: {
        type: String,
        required: [true, 'The name is required'],
    },

    user: {
        type: String,
        required: [true, 'The email is required'],
        unique: true,
    },

});


module.exports = model("Category", CategorySchema);