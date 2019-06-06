import React, { Component } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import { connect } from 'react-redux'
import viewDetail from '../reducers/todoReducer'
import { viewData, viewSeachData, searchStatus, displayStatus, onDelete } from "../reducers/todoReducer";
import Search from "../Search";
import Pagination from 'react-paginate';


import { Tooltip } from 'reactstrap';
const Todo = props => (
  <tr>
    <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
    <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
    <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
    <td>
      <Link to={"/edit/" + props.todo._id}>Edit</Link>
    </td>
    <td>
      <button onClick={(e) => props.onHandleDelete(props.todo._id)}> DELETE</button>
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
    this.handlePageClick = this.handlePageClick.bind(this)

  }

  async componentDidMount() {
    const page_obj = {
      page: 1
    }
    this.props.viewData(page_obj)
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
    const page_obj = {
      page: 1
    }
    this.props.viewData(page_obj)
    console.log(this.props.todos)

  }
  onHandleSearch() {
    const obj = {
      query: this.state.search_val
    }
    if (this.props.search === true) {
      this.props.viewSeachData(obj);
    }
    this.props.searchStatus(false)
    return this.props.todos.map((currentTodo, index) => {
      return <Todo todo={currentTodo} key={index} onHandleDelete={this.onHandleDelete} />
    })
  }

  todoList() {
    if (this.props.display === true) {
      const page_obj = {
        page: 1
      }
      this.props.viewData(page_obj)
    }
    this.props.displayStatus(false)
    console.log(this.onHandleDelete)
    console.log(this.props.todos)
    return this.props.todos.map((currentTodo, index) => {
      return <Todo todo={currentTodo} key={index} onHandleDelete={this.onHandleDelete} />
    })
  }
  handlePageClick(value) {
    console.log(value.selected + 1)
    let p = value.selected + 1
    const page_obj = {
      page: p
    }
    this.props.viewData(page_obj)
  }

  render() {
    const classes = 'tooltip-inner'
    return (
      <div>
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
        <div className="pagination-box">
          <Pagination
            previousLabel={"Prev"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.props.page}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    todos: state.todoReducer.todos,
    search: state.todoReducer.search,
    display: state.todoReducer.display,
    page: state.todoReducer.page
  }

}
const mapDispatchToProps = (dispatch) => {
  return {
    viewData: (page_obj) => { dispatch(viewData(page_obj)) },
    viewSeachData: (obj) => { dispatch(viewSeachData(obj)) },
    searchStatus: (status) => { dispatch(searchStatus(status)) },
    displayStatus: (status) => { dispatch(displayStatus(status)) },
    onDelete: (obj_new) => { dispatch(onDelete(obj_new)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)

