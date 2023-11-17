const { Schema, model } = require('mongoose')


const User = new Schema({
    name: String,
    phone: {
        type: String,
        required: true
    },
    password: String,
    message: String,
    admin: {
        type: Boolean,
        default:false
    },
    image: {
      type: [String],
      default : ['images/avatar.jpg']  
    },
    chatfon: {
      type: [String],
      default : ['images/car.webp']  
    },
    createdAt: Date,
    updatedAt: Date,
    status: {
        type:Boolean,
        default: true
    }
})



module.exports = model("User", User)