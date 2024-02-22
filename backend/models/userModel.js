const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter user name'],
        unique: true,
    },
    gender: {
        type: String,
        required: [true, 'Please select gender'],
    },
    country: {
        type: String,
        required: [true, 'Please enter country'],
    },
    city: {
        type: String,
        required: [true, 'Please enter city'],
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
    },
    role: {
        type: String,
        required: [true, 'Roll can not defined'],
    },
    registeredAt: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model('users', userSchema)