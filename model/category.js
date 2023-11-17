const {Schema, model} = require('mongoose')

const category = new Schema({
    userId:{
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: [String],
        required: true
    },
    text:{
        type: String,
        required: true
    },
    count:{
        type: String,
    },
    createdAt: Date,
    updatedAt: Date,
})


module.exports = model('Category',category)
