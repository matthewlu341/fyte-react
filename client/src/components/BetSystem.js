import React, { Component } from 'react'
import '../css/BetSystem.css'
import Spinner from 'react-bootstrap/Spinner'
import Fight from './Fight'

export default class BetSystem extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            fights: [],
            picture: '',
            loading: true
        }
    }
    componentWillMount(){
        fetch("https://fyte-server.herokuapp.com/nextevent")
            .then(response=>response.json())
            .then(data=>{this.setState({name: data.name, fights: data.fights, picture:data.picture, loading:false})})

        console.log(this.state.picture)
    }
   
    render() {
        return (
                this.state.loading ? <div className="centerSpinner"><Spinner animation="grow" variant="light" /></div> :
                <div className='betContainer'>
                <div className='box'>
                    <h2>Hello, {this.props.user}! The next event is:</h2>
                    <h1 className='eventTitle'>{this.state.name}</h1>
                    <img width={'20%'} height={'auto'} alt='Event poster here.' src={this.state.picture}></img>
                </div>
                <hr
                    style={{
                        color: 'white',
                        height: 3,
                    }}
                />
                {
                    this.state.fights.map((fight,index) => {return <Fight index={index} 
                                                                            name1={fight.f1.name} 
                                                                            name2={fight.f2.name} 
                                                                            division={fight.division}
                    ></Fight>
                    })
                }
                
                </div> 
            
        )
    }
}
