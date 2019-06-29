import React, {Component} from "react"

export default class WeatherSet extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        debugger
        console.log(this.props.temp)
        return(
            <div>
                <span>Temperature is</span> {this.props.temp}
            </div>
        )
    }
}