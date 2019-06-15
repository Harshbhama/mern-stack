import React, { Component } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import { connect } from 'react-redux'
import viewDetail from '../reducers/todoReducer'
import { viewData, viewSeachData, searchStatus, displayStatus, onDelete, fetchWeather, weatherStatus, getTemp } from "../reducers/todoReducer";
import Search from "../Search";
import Pagination from 'react-paginate';
import WeatherSet from '../WeatherSet'


// import Alert from './../Alert'


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

class TodoList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search_val: '',
      temp: ''
    }
    this.onChangeSearch = this.onChangeSearch.bind(this)
    this.onHandleSearch = this.onHandleSearch.bind(this)
    this.onHandleDelete = this.onHandleDelete.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
    this.fetchWeather = this.fetchWeather.bind(this)
    //this.myTimer = this.myTimer.bind(this)
  }

  async componentDidMount() {
    const page_obj = {
      page: 1
    }
    this.props.viewData(page_obj)
    this.props.weatherStatus(true)



    //SET INTERVAL METHOD FOR WEATHER API

    this.interval = setInterval(() => {
      const obj = {
        q: 'Noida',
        appid: 'd102dc7ecb892f7888141dfb21093f44'
      }
      this.props.fetchWeather(obj);

      //this.props.weatherStatus(false)
      const myObject = this.props.weather.main
      console.log(myObject)
      for (var key in myObject) {
        if (key === 'temp') {

          this.props.getTemp(myObject[key])
          // abc.setState({
          //   temp: (myObject[key])
          // })     
        }
      }

    }, 5000)
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
    if (window.confirm("ARE YOU SURE")) {
      //console.log(id)
      const obj_new = {
        id: id
      }
      this.props.onDelete(obj_new);
      const page_obj = {
        page: 1
      }
      this.props.viewData(page_obj)
      //console.log(this.props.todos)
    }

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
    //console.log(value.selected + 1)
    let p = value.selected + 1
    const page_obj = {
      page: p
    }
    this.props.viewData(page_obj)
  }

  fetchWeather() {
    if (this.props.weather_status === true) {
      const obj = {
        q: 'Noida',
        appid: 'd102dc7ecb892f7888141dfb21093f44'
      }
      this.props.fetchWeather(obj);
    }
    this.props.weatherStatus(false)
    const myObject = this.props.weather.main
    console.log(myObject)
    for (var key in myObject) {
      if (key === 'temp') {

        this.props.getTemp(myObject[key])
        // abc.setState({
        //   temp: (myObject[key])
        // })     
      }
    }
    console.log(this.props.temp)
    //console.log(abc.state.temp)

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

        <WeatherSet
          fetchWeather={this.fetchWeather()}
          temp={this.props.temp}
        // temp_detail = {this.props.weather.main.temp}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    todos: state.todoReducer.todos,
    search: state.todoReducer.search,
    display: state.todoReducer.display,
    page: state.todoReducer.page,
    weather: state.todoReducer.weather_data,
    weather_status: state.todoReducer.weather_status,
    temp: state.todoReducer.temp - 273
  }

}
const mapDispatchToProps = (dispatch) => {
  return {
    viewData: (page_obj) => { dispatch(viewData(page_obj)) },
    viewSeachData: (obj) => { dispatch(viewSeachData(obj)) },
    searchStatus: (status) => { dispatch(searchStatus(status)) },
    weatherStatus: (status) => { dispatch(weatherStatus(status)) },
    displayStatus: (status) => { dispatch(displayStatus(status)) },
    onDelete: (obj_new) => { dispatch(onDelete(obj_new)) },
    fetchWeather: (obj) => { dispatch(fetchWeather(obj)) },
    getTemp: (obj) => { dispatch(getTemp(obj)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)

