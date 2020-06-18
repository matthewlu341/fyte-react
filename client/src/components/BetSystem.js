import React, { Component } from 'react'
import '../css/BetSystem.css'

export default class BetSystem extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            fights: []
        }
    }
    componentWillMount(){
        fetch("https://fyte-server.herokuapp.com/nextevent")
            .then(response=>response.json())
            .then(data=>{this.setState({name: data.name, fights: data.fights})})
    }
    render() {
        return (
            <div className='betContainer'>
                <h1>{this.state.name}</h1>
                {
                    this.state.fights.map(fight => {return <div>
                    <h1 className='fight'>
                    {fight.f1.name} <sup>{fight.f1.record}</sup> vs {fight.f2.name}  <sup>{fight.f2.record}</sup> at {fight.division}
                    </h1></div>})
                }
            </div>
        )
    }
}
