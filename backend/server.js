const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 4000
const bycrpt = require('bcryptjs')

const auth = require('./middleware/auth')

let Todo = require('./todo.model')
let User = require('./user.model')
let Login = require('./login.model')
const config = require('config')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')

const todoRoutes = express.Router()

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true })


const connection = mongoose.connection

connection.once('open', function () {
  console.log("MongoDB databse connection established")
})



todoRoutes.route('/todo').post(function (req, res) {
  // Todo.find(function (err, todos) {
  //   if (err) {
  //     console.log(err)
  //   }
  //   else {
  //     res.json(todos)
  //   }
  // })

  Todo.paginate({}, { page: req.body.page, limit: 6 }, function (err, todos) {
    if (err) {
      console.log(err)
    }
    else {
      console.log(todos)
      res.json(todos)
    }
  });
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

todoRoutes.route('/add', auth).post(function (req, res) {
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

todoRoutes.route('/delete').post(function (req, res) {
  console.log(req.body)
  Todo.deleteOne({ _id: req.body.id }, function (err, todo) {
    if (err) {
      console.log(err)
    }
    else
      //res.json(todo)
      console.log(todo)
  })
  Todo.find({}, function (err, todo) {
    console.log(todo)
    res.json(todo)
  })
})


// Routes for User schema

todoRoutes.route('/user/add').post(function (req, res) {
  console.log(req.body)
  let user = new User(req.body);
  user.save()
    .then(user => {
      console.log("Added")
      res.status(200).json({ 'user': 'user added sucessfully' })
    })
    .catch(err => {
      console.log(err)
      res.status(400).send('Add new user failed')
    })
})

todoRoutes.route('/user/delete').post(function (req, res) {
  User.remove({}, function (err) {
    if (err) {
      console.log(err)
    }
    else {
      res.send('deleted')
    }
  })
})

todoRoutes.route('/user/get').get(function (req, res) {
  User.find(function (err, users) {
    if (err) {
      console.log(err)
    }
    else {
      console.log(users)
      res.json(users)
    }
  })
})

//Test Auth

todoRoutes.route('/login/add').post(function (req, res) {
  console.log(req.body)
  const { name, email, password } = req.body
  Login.findOne({ email })
    .then(login => {
      if (login) return res.status(400).json({ msg: 'User already exists' })

      const newLogin = new Login({
        name,
        email,
        password
      })

      bycrpt.genSalt(10, (err, salt) => {
        bycrpt.hash(newLogin.password, salt, (err, hash) => {
          if (err) {
            console.log(err)
          }
          newLogin.password = hash
          newLogin.save()
            .then(login => {
              jwt.sign(
                { id: login.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) {
                    console.log(err)
                  }
                  console.log("Token = " + token)
                  res.json({
                    token,
                    login: {
                      id: login.id,
                      name: login.name,
                      email: login.email
                    }
                  })
                }
              )
            })
        })
      })

    })
})






todoRoutes.route('/login/get').post(function (req, res) {
  console.log(req.body)
  const { email, password } = req.body
  Login.findOne({ email })
    .then(login => {
      if (!login) {
        console.log("USER DOESNOT EXISTS")
        return res.status(400).json({ msg: 'User doesnot exists' })}

      //Validate Password

      bycrpt.compare(password, login.password)
      .then(isMatch => {
        if(!isMatch){ 
          console.log("INVALID CREDENTIALS")
          return res.status(400).json({ msg: 'Invalid Credentials'})
      }
        jwt.sign(
          { id: login.id },
          config.get('jwtSecret'),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              console.log(err)
            }
            console.log("Token = " + token)
            res.json({
              token,
              login: {
                id: login.id,
                name: login.name,
                email: login.email
              }
            })
          }
        )
      })

    })
})

// todoRoutes.route('/login/test').get(auth, function(res, req) {
//   console.log(req.login)
//   Login.findById(req.login.id)
//   .select('-password')
//   .then(login => res.json(login))
// })

todoRoutes.get('/login/test', auth, (req, res) => {
  Login.findById(req.login.id)
    .select('-password')
    .then(login => res.json(login));
});



// Express Content

app.use(cors())
app.use(bodyParser.json())

app.use('/todos', todoRoutes)
//app.use('/users', userRoutes)

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT)
})