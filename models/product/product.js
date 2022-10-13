
const { Schema, model } = require('mongoose')

const ProductSchema = Schema({

    name: {
        type: String,
        required: [true, 'The name is required'],
    },

    priceUni: {
        type: Number,
        required: [true, 'The price is required'],
        // unique: true,
    },

    category: {
        type: String,
        required: [true, 'The password is required'],
    },

    available: {
        type: Boolean,
        default: false,
    },

    user: {
        type: String,
        required: [true, 'The role is required'],
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
    },


});


module.exports = model("Product", ProductSchema);