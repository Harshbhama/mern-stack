import React, { Component } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import { connect } from 'react-redux'
import viewDetail from '../reducers/todoReducer'
import { viewData } from "../reducers/todoReducer";

const Todo = props => (
  <tr>
    <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
    <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
    <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
    <td>
      <Link to={"/edit/" + props.todo._id}>Edit</Link>
    </td>
  </tr>
)


class TodoList extends Component {

  constructor(props) {
    super(props)

  }

  async componentDidMount() {
    this.props.viewData()
  }
  todoList() {
    //this.props.viewData()
    console.log(this.props.todos)
    return this.props.todos.map(function (currentTodo, index) {
      return <Todo todo={currentTodo} key={index} />
    })
  }
  render() {
    return (
      <div>
        <h3>TodoList</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Desciption</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.todoList()}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    todos: state.todoReducer.todos
  }

}
const mapDispatchToProps = (dispatch) => {
  return {
    viewData: () => { dispatch(viewData()) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)

