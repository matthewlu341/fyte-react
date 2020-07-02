import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import '../css/BetSystem.css'
import Spinner from 'react-bootstrap/Spinner'
import Fight from './Fight'
import {Animated} from "react-animated-css";
import BetModal from './BetModal'
import {Checkmark} from 'react-checkmark';
import { FaRegHandPointer } from 'react-icons/fa';
import { IconContext } from "react-icons";

export default class BetSystem extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            fights: [],
            selectedFighters: [],
            picture: '',
            loading: true,
            modalOn: false,
            hasBet: null,
            picks: []
        }
        this.setSelectedList = this.setSelectedList.bind(this);
        this.isSelectedEmpty = this.isSelectedEmpty.bind(this);
        this.showModal=this.showModal.bind(this); 
        this.hasUserBet = this.hasUserBet.bind(this);  
    }
    componentWillMount(){
        fetch("https://fyte-server.herokuapp.com/nextevent")
            .then(response=>response.json())
            .then(data=>{this.setState({name: data.name, fights: data.fights, picture:data.picture, loading:false})})
        this.hasUserBet();
    }
    hasUserBet(){
        fetch('https://fyte-server.herokuapp.com/hasuserbet', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user:this.props.user})
        })
            .then(response => response.json())
            .then(picks => {this.setState({hasBet: picks!==null, picks: picks})})
    }
    setSelectedList(fighter, index, beenSelected){
        let tempSelected = this.state.selectedFighters;
        if(beenSelected){
            delete tempSelected[index];
        } else{
            tempSelected[index] = fighter;
        }
        this.setState({selectedFighters: tempSelected})
    }
    isSelectedEmpty(){
        let array = this.state.selectedFighters.filter(element => element);
        return array.length === 0;
    }
    showModal(){
        this.setState({showModal:true});
    }
    render() {
        return (
                this.state.loading ? <div className="centerSpinner"><Spinner animation="grow" variant="light" /></div> :
                <div className='betContainer'>
                    <div className='box'>
                        <h2>Hello, {this.props.user}! The next event is:</h2>
                        <h1 className='eventTitle'>{this.state.name}</h1>
                        <img id='eventPic' width={'30%'} height={'auto'} alt='Event poster here.' src={this.state.picture}></img>
                        {this.state.hasBet ? 
                        <div id='confirmed'>
                            <Checkmark size='large'/> 
                            <h4 id='confirmation'>You've picked:</h4>
                            {
                                this.state.picks.map(pick => <h5 className='pick'>{pick} </h5>)
                            }
                        </div>: 
                        (this.isSelectedEmpty() ? <Button disabled size='lg' variant="success">Bet</Button> : 
                            <Animated animationIn='pulse'>
                                <BetModal hasuserBet ={this.hasUserBet} user={this.props.user} eventName={this.state.name} picks={this.state.selectedFighters}></BetModal>
                            </Animated>)
                        }
                        <hr id='separator' style={{color: 'white',height: 2, width: '30%'}}/>
                    </div>
                {
                this.state.picks ? <div></div> : <div id='help'>
                            <IconContext.Provider value={{ color: "white"}}>
                                <div>
                                   <FaRegHandPointer />
                                </div>
                            </IconContext.Provider>
                            <h6 id='click'>Click a fighter's name to pick them.</h6>
                        </div>
                }
                {
                    this.state.fights.map((fight,index) => {return <Fight index={index} 
                                                                            name1={fight.f1.name} 
                                                                            name2={fight.f2.name} 
                                                                            division={fight.division}
                                                                            selectFunction = {this.setSelectedList}
                                                                            picks = {this.state.picks}
                    ></Fight>
                    })
                }
                
                </div> 
            
        )
    }
}
