const { Schema, model } = require('mongoose')


const Group = new Schema({

    catId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    name:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    createdAt: Date,

})

module.exports = model("Group", Group)