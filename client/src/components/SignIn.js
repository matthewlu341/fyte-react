import React, { Component } from 'react'
import '../css/Bet.css'
import '../css/TachyonsLogin.css'

export default class SignIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: '',
            pass: ''
        }
        this.onUserChange = this.onUserChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.load = this.load.bind(this);
        this.signUp = this.signUp.bind(this);
    }
    onUserChange(event){
        this.setState({user: event.target.value})
    }
    onPassChange(event){
        this.setState({pass: event.target.value})
    }
    load(){
        this.props.onRouteChange('signedIn')
    }
    signUp(){
        this.props.onRouteChange('signUp')
    }

    render() {
        return (
            <div>
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
                    <input onClick = {this.load} class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                    </div>
                    <div class="lh-copy mt3">
                    <a onClick = {this.signUp} href="#0" class="f6 link dim black db">Sign up</a>
                    </div>
                </form>
            </div>
        )
    }
}
