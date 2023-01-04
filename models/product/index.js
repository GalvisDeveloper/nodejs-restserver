
const { Schema, model } = require('mongoose')

const ProductSchema = Schema({

    name: {
        type: String,
        required: [true, 'The name is required'],
        unique: true,
    },

    price: {
        type: Number,
        default: 0,
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        unique: true,
    },

    available: {
        type: Boolean,
        default: true,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
    },

    description: {
        type: String,
    },

    status: {
        type: Boolean,
        default: true,
        required: true,
    },

});

ProductSchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();
    return data;
}

module.exports = model("Product", ProductSchema);