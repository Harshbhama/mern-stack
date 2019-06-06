const mongoose = require ('mongoose')
const mongoosePaginate = require('mongoose-paginate');  
const Schema = mongoose.Schema

let Todo = new Schema({
    todo_description: {
        type: String
    },
    todo_responsible: {
        type: String 
    },
    todo_priority: {
        type: String
    },
    todo_completed: {
        type: Boolean
    }
})
// Todo.find({ todo_description: query }, function(err, user) {
//     if (err) throw err;
  
//     // object of the user
//     console.log(Todo);
//   });

Todo.plugin(mongoosePaginate);
module.exports = mongoose.model('Todo', Todo)