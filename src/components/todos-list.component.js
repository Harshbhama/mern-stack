import React, { Component } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import { connect } from 'react-redux'
import viewDetail from '../reducers/todoReducer'
import { viewData, viewSeachData } from "../reducers/todoReducer";
import Search from "../Search";

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
const Todonew = props => (
  <tr>
    <td >{props.todo_description}</td>
    <td >{props.todo_responsible}</td>
    <td >{props.todo_priority}</td>
    <td>
      <Link to={"/edit/" + props.id}>Edit</Link>
    </td>
  </tr>
  
)

class TodoList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search_val: ''
    }
    this.onChangeSearch = this.onChangeSearch.bind(this)
    this.onHandleSearch = this.onHandleSearch.bind(this)

  }

  async componentDidMount() {
    this.props.viewData()
    //this.props.searchChangeDescription()
  }
  onChangeSearch(e) {
    debugger
    this.setState({
      search_val: e.target.value
    })
  }
  onHandleSearch(){
    // let abc = this.state.search_val
    // let description
    // let responsible
    // let priority
    // let id
    // let temp = 0;
    // this.props.todos.forEach(function (a, index) {
    //   let z = [...a.todo_description]
    //   let x = [...abc]
    //   z.forEach(function (b, newindex) {
    //     if ((z[newindex] === x[newindex]) && temp === 0) {
    //       description = a.todo_description
    //       responsible = a.todo_responsible
    //       priority = a.todo_priority
    //       id = a._id
    //       //window.alert("OK")
    //       //this.props.searchChangeDescription(a.todo_description)
    //     }
    //     else{
    //       temp =1
    //     }
    //   })
    //   temp = 0;
    // })
    // return <Todonew
    //   todo_description={description}
    //   todo_responsible = {responsible}
    //   todo_priority = {priority}
    //   id = {id}
    // />
    const obj = {
      query: this.state.search_val
    }


   
    // axios.post('http://localhost:4000/todos/search', obj)
    // .then(response => {
    //  console.log(response)
    // }).catch(error => {
    //   console.log(error)
      
    // })
    this.props.viewSeachData(obj);
    console.log(this.props.todos)
    return this.props.todos.map(function (currentTodo, index) {
      return <Todo todo={currentTodo} key={index} />
    })
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
        {/* <Search 
        todos = {this.props.todos}
        /> */}
        <form>
          <input
            placeholder="Search"
            value={this.state.search_val}
            onChange={this.onChangeSearch}
          />
        </form>
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
            {this.state.search_val === '' ? this.todoList(): this.onHandleSearch()}
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
    viewData: () => { dispatch(viewData()) },
    viewSeachData: (obj) => {dispatch(viewSeachData(obj))}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)

