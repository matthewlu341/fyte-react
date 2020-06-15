import React, { Component } from 'react'
import '../css/TachyonsLogin.css'
import '../css/Bet.css'

export default class SignUp extends Component {
    render() {
        return (
            <div>
                <form class="measure center">
                    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                    <legend class="f4 fw6 ph0 mh0">Sign Up</legend>
                    <div class="mt3">
                        <label class="db fw6 lh-copy f6" for="email-address">Username</label>
                        <input class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div class="mv3">
                        <label class="db fw6 lh-copy f6" for="password">Password</label>
                        <input class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                    </div>
                    </fieldset>
                    <div class="">
                    <input onClick={this.props.onSignUp} class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign up"/>
                    </div>
                    <div class="lh-copy mt3">
                    <a onClick={this.props.onSignIn} href="#0" class="f6 link dim black db">Sign in</a>
                    </div>
                </form>
            </div>
        )
    }
}
