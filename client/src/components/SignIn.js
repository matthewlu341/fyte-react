import React, { Component } from 'react'
import '../css/TachyonsLogin.css'
import '../css/Bet.css'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

export default class SignIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: '',
            pass: '',
            error: '',
            signUpClicked: false
        }
        this.onUserChange = this.onUserChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.load = this.load.bind(this)
    }
    onUserChange(event){
        this.setState({user: event.target.value})
    }
    onPassChange(event){
        this.setState({pass: event.target.value})
    }
    async load(){
        this.setState({signUpClicked:true})
        let response = await fetch('https://fyte-server.onrender.com/signin', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({user: this.state.user, pass: this.state.pass})
        })
        let data = await response.json();
        if(data==='loggedIn'){
            this.props.onRouteChange('signedIn', this.state.user)
        }
        if (data==='wrongPw'){
            this.setState({error: 'Incorrect password'})
        }
        if (data==='user not found'){
            this.setState({error: 'Username not found'})
        }
    }

    render() {
        return (
            <div className='formContent'>
                <form class="measure center">
                    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                    <legend class="f4 fw6 ph0 mh0">Sign In to Bet</legend>
                    <div class="mt3">
                        <label class="db fw6 lh-copy f6" for="email-address">Username</label>
                        <input onChange={this.onUserChange} class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" aria-describedby="name-desc"/>
                    </div>
                    <div class="mv3">
                        <label class="db fw6 lh-copy f6" for="password">Password</label>
                        <input onChange={this.onPassChange} class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                    </div>
                    </fieldset>
                    <div class="">
                    <Button onClick={this.load} variant="outline-light">Sign In</Button>{'Sign In'}
                    </div>
                    <div class="lh-copy mt3">
                    <a onClick = {this.props.onRouteChange.bind(this,'signUp')} href="#0" class="f6 link dim black db">Sign up</a>
                    </div>
                </form>
                {
                    (this.state.error ? <Alert variant = {"danger"}>{this.state.error}.</Alert> : 
                    (this.state.signUpClicked ? <Spinner animation='border' variant="light"/> : <div></div>))
                }
            </div>
        )
    }
}
