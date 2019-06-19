const mongoose = require ('mongoose')
const Schema = mongoose.Schema

let User = new Schema({
    content: {
        type: String,
        
    },
    number: {
        type: String
    }
})

module.exports = mongoose.model('User', User)