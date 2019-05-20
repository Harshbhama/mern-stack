import React, { Component } from "react";

import axios from "axios"
import { connect } from "react-redux"
import {viewDataChange, onChangeTodoDescription, onChangeTodoResponsible, onChangeTodoPriority, onChangeTodoCompleted, viewDataUpdate} from '../reducers/editReducer'
 class EditTodo extends Component {

    constructor(props) {
        super(props)
        // this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this)
        // this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this)
        // this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this)
        // this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this)

        this.onSubmit = this.onSubmit.bind(this)
    }

    async componentDidMount() {
        this.props.viewDataChange(this.props)
      
    }
    // onChangeTodoDescription(e) {
    //     this.setState({
    //         todo_description: e.target.value
    //     })
    // }

    // onChangeTodoResponsible(e) {
    //     this.setState({
    //         todo_responsible: e.target.value
    //     })
    // }
    // onChangeTodoPriority(e) {
    //     this.setState({
    //         todo_priority: e.target.value
    //     })
    // }

    // onChangeTodoCompleted(e) {
    //     this.setState({
    //         todo_completed: !this.state.todo_completed
    //     })
    // }

    onSubmit(e) {

        e.preventDefault();
        const obj = {
            todo_description: this.props.todo_description,
            todo_responsible: this.props.todo_responsible,
            todo_priority: this.props.todo_priority,
            todo_completed: this.props.todo_completed
        }
        console.log(this.props.todo_completed)
        // axios.post('http://localhost:4000/todos/update/' + this.props.match.params.id, obj)
        //     .then(res => console.log(res.data))
        // 
        this.props.viewDataUpdate(this.props, obj)
        this.props.history.push('/');
        

    }

    render() {
        let completed = this.props.todo_completed;
        return (
            <div>
                <h3>Update todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Desciption: </label>
                        <input type="text"
                            className="form-control"
                            value={this.props.todo_description}
                            onChange={(e) => this.props.onChangeTodoDescription(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
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

                            <input type="submit" value="Update Todo" className="btn btn-primary" />

                        </div>

                    </div>


                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.editReducer)
    return {
        todo_description: state.editReducer.todo_description,
        todo_responsible: state.editReducer.todo_responsible,
        todo_priority: state.editReducer.todo_priority,
        todo_completed: state.editReducer.completed
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        viewDataChange: (props) => {dispatch(viewDataChange(props))},
        onChangeTodoDescription: (props) => {dispatch(onChangeTodoDescription(props))},
        onChangeTodoResponsible: (props) => {dispatch(onChangeTodoResponsible(props))},
        onChangeTodoPriority: (props) => {dispatch(onChangeTodoPriority(props))},
        onChangeTodoCompleted: (props) => {dispatch(onChangeTodoCompleted(props))},
        viewDataUpdate: (props, obj) => {dispatch(viewDataUpdate(props, obj))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditTodo)




