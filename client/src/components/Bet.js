import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import '../css/Discover.css'

export default class Bet extends Component {
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
                <h1>Betting</h1>
            </div>
        )
    }
}
