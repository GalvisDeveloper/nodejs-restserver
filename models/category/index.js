
const { Schema, model } = require('mongoose')

const CategorySchema = Schema({

    name: {
        type: String,
        required: [true, 'The name is required'],
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
        unique: true,
    },

});


module.exports = model("Category", CategorySchema);