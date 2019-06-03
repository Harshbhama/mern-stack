const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 4000

let Todo = require('./todo.model')

const mongoose = require('mongoose')
const todoRoutes = express.Router()

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true })
const connection = mongoose.connection

connection.once('open', function () {
  console.log("MongoDB databse connection established")
})

todoRoutes.route('/').get(function (req, res) {
  Todo.find(function (err, todos) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(todos)
    }
  })
})

todoRoutes.route('/:id').get(function (req, res) {
  let id = req.params.id
  console.log(id)
  Todo.findById(id, function (err, todo) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(todo)
    }
  })
});

todoRoutes.route('/add').post(function (req, res) {
  console.log(req.body)
  let todo = new Todo(req.body);
  todo.save()
    .then(todo => {
      res.status(200).json({ 'todo': 'todo added sucessfully' })
    })
    .catch(err => {
      res.status(400).send('Add new todo failed')
    })
})

todoRoutes.route('/update/:id').post(function (req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    if (!todo)
      res.status(404).send('data is not found')
    else
      todo.todo_description = req.body.todo_description
    todo.todo_responsible = req.body.todo_responsible
    todo.todo_priority = req.body.todo_priority
    todo.todo_completed = req.body.todo_completed

    todo.save().then(todo => {
      res.json('Todo updated')
    })
      .catch(err => {
        res.status(400).send("Update not possible")
      })
  })

})


todoRoutes.route('/search').post(function (req, res) {
  //Mongoose Query
  console.log(req.body.query)
  let value = '^' + req.body.query;
  Todo.find({
    todo_description: {
      '$regex': value,
      '$options': 'i'
    }
  }, function (err, description) {
    //console.log(Todo)
    res.json(description)
    console.log(description)
  })

})

todoRoutes.route('/delete').post(function (req, res){
  console.log(req.body)
  Todo.deleteOne({_id: req.body.id}, function(err,todo){
     if(err){
       console.log(err)
     }
     else
     //res.json(todo)
     console.log(todo)
  })
  Todo.find({}, function(err, todo){
    console.log(todo)
    res.json(todo)
  })
})


app.use(cors())
app.use(bodyParser.json())

app.use('/todos', todoRoutes)


app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT)
})