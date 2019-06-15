import React, { Component } from "react";
import axios from 'axios'

import { connect } from "react-redux"

import { createData, onChangeTodoDescription, onChangeTodoResponsible, onChangeTodoPriority, onChangeTodoCompleted } from '../reducers/createReducer'

class CreateTodo extends Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)

  }
  onSubmit(e) {
    e.preventDefault()
    debugger
    const newTodo = {
      todo_description: this.props.todo_description,
      todo_responsible: this.props.todo_responsible,
      todo_priority: this.props.todo_priority,
      todo_completed: this.props.todo_completed
    }
    this.props.createData(newTodo)
    window.history.back();

  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create new Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div class="form-group">
            <label>Desciption</label>
            <input type="text"
              className="form-control"
              value={this.props.todo_description}
              onChange={(e) => this.props.onChangeTodoDescription(e)}
            />
          </div>

          <div class="form-group">
            <label>Responsible</label>
            <input type="text"
              className="form-control"
              value={this.props.todo_responsible}
              onChange={(e) => this.props.onChangeTodoResponsible(e)}
            />
          </div>

          <div className="form-group">
            <div className="form-check form-check-inline">
              <input className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Low"
                checked={this.props.todo_priority === 'Low'}
                onChange={(e) => this.props.onChangeTodoPriority(e)}
              />
              <label className="form-check-label ">Low </label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Medium"
                checked={this.props.todo_priority === 'Medium'}
                onChange={(e) => this.props.onChangeTodoPriority(e)}
              />
              <label className="form-check-label ">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="High"
                checked={this.props.todo_priority === 'High'}
                onChange={(e) => this.props.onChangeTodoPriority(e)}
              />
              <label className="form-check-label ">High </label>
            </div>
          </div>
          <div className="form-check">
            <input type="checkbox"
              className="form-check-input"
              id="completedCheckbox"
              name="completedCheckbox"
              onChange={(e) => this.props.onChangeTodoCompleted(e)}
              checked={this.props.todo_completed}
              value={this.props.todo_completed}
            />
            <label className="form-check-label" htmlFor="completedCheckbox">
              Completed
            </label>
          </div>
          <br />
          <div className="form-group">
            <input type='submit' value='CreateTodo' className="btn btn-primary" />
          </div>

        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.createReducer.todo_description)
  return {
    todo_description: state.createReducer.todo_description,
    todo_responsible: state.createReducer.todo_responsible,
    todo_priority: state.createReducer.todo_priority,
    todo_completed: state.createReducer.todo_completed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeTodoDescription: (props) => { dispatch(onChangeTodoDescription(props)) },
    onChangeTodoResponsible: (props) => { dispatch(onChangeTodoResponsible(props)) },
    onChangeTodoPriority: (props) => { dispatch(onChangeTodoPriority(props)) },
    onChangeTodoCompleted: (props) => { dispatch(onChangeTodoCompleted(props)) },
    createData: (props) => { dispatch(createData(props)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTodo)





