const { Schema, model } = require('mongoose')

const chat = new Schema({
    groupId:{
        type: Schema.Types.ObjectId,
        ref: "Group"
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message:{
        type: String,
    },
    file:{
        type: Object,
        },
    createdAt: Date,
})


module.exports = model('Chat', chat)