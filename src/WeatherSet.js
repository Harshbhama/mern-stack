import React, {Component} from "react"

export default class WeatherSet extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <span>Temperature is</span> {this.props.temp}
               
            </div>
        )
    }
}