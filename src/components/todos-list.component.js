import React, { Component } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import { connect } from 'react-redux'
import viewDetail from '../reducers/todoReducer'
import { viewData, viewSeachData, searchStatus, displayStatus, onDelete } from "../reducers/todoReducer";
import Search from "../Search";

const Todo = props => (
  <tr>
    <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
    <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
    <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
    <td>
      <Link to={"/edit/" + props.todo._id}>Edit</Link>
    </td>
    <td>
      <button onClick={(e) => props.onHandleDelete(props.todo._id)} > DELETE</button>
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
    this.onHandleDelete = this.onHandleDelete.bind(this)
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

    this.props.searchStatus(true)

    if (this.state.search_val === '') {
      this.props.displayStatus(true)
    }
  }

  onHandleDelete(id) {
    debugger
    console.log(id)
    const obj_new = {
      id: id
    }
    this.props.onDelete(obj_new);
    this.props.viewData()
    console.log(this.props.todos)

  }
  onHandleSearch() {

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
    if (this.props.search === true) {
      this.props.viewSeachData(obj);
    }
    this.props.searchStatus(false)
    return this.props.todos.map((currentTodo, index) => {
      return <Todo todo={currentTodo} key={index} onHandleDelete={this.onHandleDelete} />
    })
  }

  todoList() {
    // if(this.props.searchStatus === false){
    //   this.props.viewData()
    // }
    if (this.props.display === true) {
      this.props.viewData()
    }
    this.props.displayStatus(false)
    //this.props.viewData();
    //this.props.searchStatus(true)
    console.log(this.onHandleDelete)
    console.log(this.props.todos)
    return this.props.todos.map((currentTodo, index) => {
      return <Todo todo={currentTodo} key={index} onHandleDelete={this.onHandleDelete} />
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
            {this.state.search_val === '' ? this.todoList() : this.onHandleSearch()}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    todos: state.todoReducer.todos,
    search: state.todoReducer.search,
    display: state.todoReducer.display
  }

}
const mapDispatchToProps = (dispatch) => {
  return {
    viewData: () => { dispatch(viewData()) },
    viewSeachData: (obj) => { dispatch(viewSeachData(obj)) },
    searchStatus: (status) => { dispatch(searchStatus(status)) },
    displayStatus: (status) => { dispatch(displayStatus(status)) },
    onDelete: (obj_new) => { dispatch(onDelete(obj_new)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)

