const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    email:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    username:{
        type: String,
        require: true
    },
    password: {
        type: String,
        require : true
    }
})

const User = mongoose.model("USERS",userschema);

module.exports = User;