import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import SignIn  from "./SignIn.js"
import SignUp  from "./SignUp.js"


export default class Bet extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: 'signIn'
        }
        this.clicked = this.clicked.bind(this)
    }
    clicked(arg){
        switch(arg){
            case 'back':
                this.setState({show: 'signIn'})
                break;
            case 'signIn':
                this.setState({show:'signedIn'})
                break;
            case 'signUp':
                this.setState({show: 'signUp'})
                break;
            default: break;
        }

    }
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand  className='brand' href="">FYTE</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="" onClick={this.props.setRoute.bind(this,'watch')}>Watch</Nav.Link>
                        <Nav.Link active href="#">Bet</Nav.Link>
                        <Nav.Link href="" onClick={this.props.setRoute.bind(this,'discover')}>Discover</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {
                    (this.state.show==='signedIn' ? <h1>Signed In</h1> : 
                    (this.state.show==='signIn'? <SignIn onSignIn = {this.clicked.bind(this, 'signIn')} onSignUp = {this.clicked.bind(this, 'signUp')}></SignIn>
                    :<SignUp onSignUp = {this.clicked.bind(this, 'signIn')} onSignIn = {this.clicked.bind(this, 'back')}></SignUp>))
                }
            </div>
        )
    }
}
