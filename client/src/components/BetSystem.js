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
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default class BetSystem extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            countdown: '',
            fights: [],
            selectedFighters: [],
            picture: '',
            loading: true,
            modalOn: false,
            hasBet: null,
            picks: [],
            correctPicks: '',
            correct: 0,
            total: 0
        }
        this.setSelectedList = this.setSelectedList.bind(this);
        this.isSelectedEmpty = this.isSelectedEmpty.bind(this);
        this.showModal=this.showModal.bind(this); 
        this.hasUserBet = this.hasUserBet.bind(this);  
        this.getScore = this.getScore.bind(this);
    }
    componentWillMount(){
        fetch("https://fyte-server.onrender.com/nextevent")
            .then(response=>response.json())
            .then(data=>{this.setState({name: data.name, fights: data.fights, picture:data.picture, loading:false, countdown:data.countdown})})
        fetch('https://fyte-server.onrender.com/comparebets', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({currentDate: new Date().toDateString(), user:this.props.user})
        })
            .then(response=>response.json())
            .then(data=>{this.setState({correctPicks:data})})
            .then(()=>this.getScore())
            .then(()=> this.hasUserBet())

    }
    getScore(){
        fetch('https://fyte-server.onrender.com/getscore', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user:this.props.user})
        })
            .then(response=>response.json())
            .then(data=>{this.setState({correct:data.correct, total:data.total})})
    }
    hasUserBet(){
        fetch('https://fyte-server.onrender.com/hasuserbet', {
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
                        {console.log(this.state.countdown)}
                        <div id='event'>
                            <h1 className='eventTitle'>{this.state.name}</h1> - 
                            {this.state.countdown===0 ? <h3>(today)</h3> : 
                            this.state.countdown===1 ? <h3>(tomorrow)</h3> : <h3>({this.state.countdown} days)</h3>}
                        </div>

                        <img id='eventPic' width={'30%'} height={'auto'} alt='Event poster here.' src={this.state.picture}></img>

                        {this.state.hasBet ? 
                        <div id='confirmed'>
                            <Checkmark size='large'/> 
                            <h4 id='confirmation'>You've picked:</h4>
                            {
                                this.state.picks.map(pick => <h5 className='pick'>{pick} </h5>)
                            }
                        </div>
                        : 
                        (this.isSelectedEmpty() ? <Button disabled size='lg' variant="success">Bet</Button> : 
                            <Animated animationIn='pulse'>
                                <BetModal getScore={this.getScore} hasuserBet ={this.hasUserBet} user={this.props.user} eventName={this.state.name} picks={this.state.selectedFighters}></BetModal>
                            </Animated>)
                        }

                        <div id = 'score'>
                            <h4 id='pickScore'>Your pick score:</h4>
                            <CircularProgressbar maxValue={1} value={this.state.correct/this.state.total} 
                            text={`${this.state.correct}/${this.state.total}`} styles={{root:{width: '15%', height: 'auto'}}} />;
                        </div>

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
