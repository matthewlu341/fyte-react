import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import '../css/Watch.css'

class Watch extends Component {
    constructor(props){
        super(props);
        this.state = {
            streams: []
        }
    }
    async componentWillMount(){
        let response = await fetch('https://fyte-server.herokuapp.com/streams');
        let streams = await response.json();
        this.setState({streams: streams})

    }
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand className='brand' href="">FYTE</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link active href="">Watch</Nav.Link>
                        <Nav.Link href="" onClick={this.props.setRoute.bind(this,'bet')}>Bet</Nav.Link>
                        <Nav.Link href="" onClick={this.props.setRoute.bind(this,'discover')}>Discover</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <h1>Watching</h1>
                {
                    this.state.streams.map(stream => {
                    return <h3>{stream.name}</h3>
                    })
                }
            </div>
        )
    }
}

export default Watch;
