const { Schema, model } = require('mongoose')


const Comment = new Schema({
    lessonId: {
        type:Schema.Types.ObjectId,
        ref:'Product'
    },
    userId: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    comment:{
        type: String,
        required: true
    },
    createdAt: Date,
})

module.exports = model("Comment", Comment)