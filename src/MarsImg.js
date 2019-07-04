import React, { Component } from 'react'

export default class MarsImg extends Component {
    componentDidMount(){
        this.props.onHandleScroll()
        
    }
    render() {
      
        return (
            <div>
                <img style={{ height: '500px', width: '500px' }} src={this.props.pic} />
            </div>
        )
    }
}


