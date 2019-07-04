import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import TodoList from "./components/todos-list.component"
import EditTodo from "./components/edit-todo.component"
import CreateTodo from "./components/create-todo.component"
import TestAuth from "./test/TestAuth"


import { Link } from "react-router-dom"
class App extends Component {
  render() {
    return (
        <div className = "container">
          <h1>Hello</h1>
          <ul>
            <li><Link to = '/' > Todolist</Link></li>
            {/* <li><Link to = '/edit/:id' > EditTodo</Link></li> */}
            <li><Link to = '/create' > CreateTodo</Link></li>
          </ul>
          <Switch>
            <Route exact path = '/' component = {TodoList} />
            <Route exact path = '/edit/:id' component = {EditTodo} />
            <Route exact path = '/create' component = {CreateTodo} />
            <Route exact path = '/test' component = {TestAuth}/>
          </Switch>
        </div>
          
        
    );
  }
}

export default App;
