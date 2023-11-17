const { Schema,  model }  = require("mongoose")

const Avatar = new Schema({
    userId: Schema.Types.ObjectId,
    image: {
        type: [String],
        required: true
    }
})



module.exports = model("Avatar", Avatar)