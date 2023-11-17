const {Schema, model} = require('mongoose')



const product = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    title:{
        type: String,
        required: true
    },
    iframe: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        required: true
    },
    createdAt: Date,
    updatedAt: Date,
})


module.exports = model('Product', product)