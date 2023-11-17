const { Schema, model } = require('mongoose')


const Question = new Schema({
    catId: {
        type: Schema.Types.ObjectId,
        ref: 'Kahoot'
    },
    question: {
        type: String,
        required: true
    },
    answer:{
        type: Object,
        answer1: String,
        answer2: String,
        answer3: String,
        answer4: String,
    },
    toggle: {
        type: Boolean
    },
    toggle2: {
        type: Boolean
    },
    toggle3: {
        type: Boolean
    },
    toggle4: {
        type: Boolean
    },
    createdAt: Date
})

module.exports = model("Question", Question)