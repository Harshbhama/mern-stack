import React, { Component } from "react"
import axios from 'axios'
export default class TestAuth extends Component {


  constructor(props) {
    super(props)
    this.state = {
      password: '',
      name: '',
      email: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()

    const props = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }


    axios.post('http://localhost:4000/todos/login/add', props)
      .then(response => {
        //console.log(props)
        console.log("Done")

      }).catch(error => {
        console.log(error)
      
      })
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>Name</label>
          <input
            type="text"
            placeholder="name"
            value={this.state.name}
            onChange={(e) => this.onChangeName(e)}
          />
          <label>Email</label>
          <input
            type="text"
            placeholder="email"
            value={this.state.email}
            onChange={(e) => this.onChangeEmail(e)}
          />
          <label>Password</label>
          <input
            type="number"
            placeholder="password"
            value={this.state.password}
            onChange={(e) => this.onChangePassword(e)}
          />
          <input type="submit" />
        </form>
      </div>
    )
  }
}