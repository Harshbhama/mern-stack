import React from 'react'

export default class Search extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            todos: props.todos,
            todo_description: props.todos.todo_description
        }
        console.log(this.state.todos)
    }
    onChange(){

    }

    render() {
        return(
            <form>
                <input
                    placeholder = "Search"
                    value = {this.state.todo_description}
                    onChange = {this.onChange}
                />
            </form>
        )
    }
}