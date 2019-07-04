const mongoose = require ('mongoose')
const Schema = mongoose.Schema

let Login = new Schema({
    name: {
        type: String,    
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    register_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Login', Login)