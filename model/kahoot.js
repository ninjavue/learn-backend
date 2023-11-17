const {Schema, model} = require('mongoose')


const kahoot = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    gameStart:{
        type: Number
    },
    title: {
        type: String,
        required: true
    },
    bgcolor: String,
    createdAt: Date,
    updatedAt: Date,
})


module.exports = model('Kahoot', kahoot)