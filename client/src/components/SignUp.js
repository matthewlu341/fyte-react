import React, { Component } from 'react'
import '../css/TachyonsLogin.css'
import '../css/Bet.css'

export default class SignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: '',
            pass: ''
        }
        this.onUserChange = this.onUserChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.load = this.load.bind(this);
    }
    onUserChange(event){
        this.setState({user: event.target.value})
    }
    onPassChange(event){
        this.setState({pass: event.target.value})
    }
    load(){
        this.signUp();
    }
    async signUp(){
        let response = await fetch('http://localhost:3001/signup', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({user: this.state.user, pass: this.state.pass})
        })
        let data = await response.json();
        if(data.rowCount===1){
            this.props.onRouteChange('signedIn');
        }
    }
    render() {
        return (
            <div>
                <form class="measure center">
                    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                    <legend class="f4 fw6 ph0 mh0">Sign Up</legend>
                    <div class="mt3">
                        <label class="db fw6 lh-copy f6" for="email-address">Username</label>
                        <input onChange={this.onUserChange} class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div class="mv3">
                        <label class="db fw6 lh-copy f6" for="password">Password</label>
                        <input onChange={this.onPassChange} class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                    </div>
                    </fieldset>
                    <div class="">
                    <input onClick={this.load}  class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign up"/>
                    </div>
                    <div class="lh-copy mt3">
                    <a href="#0" class="f6 link dim black db">Sign in</a>
                    </div>
                </form>
            </div>
        )
    }
}
