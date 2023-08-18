const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },    
    email: {
        type: String, 
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    role: {
        type: Number,
        required: false,
    },
    status:{
        type: Number,
        default: 1
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
