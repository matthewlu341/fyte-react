import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import '../css/Watch.css'
import { MdHighQuality } from "react-icons/md";
import Spinner from 'react-bootstrap/Spinner'

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
                <Spinner variant='secondary' size='50em' animation="grow" />
                <div className='container'>
                    <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Dropdown Button
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                </div>
                <div className='streams'>
                    {
                        this.state.streams.map(stream => {
                            return <Card
                            bg={'light'}
                            style={{ width: '18rem' }}
                        >
                            <Card.Header><a rel="noopener noreferrer" target="_blank" href={stream.link}>{stream.name} </a> <MdHighQuality size='2em'></MdHighQuality></Card.Header>
                            <Card.Body>
                            <Card.Text>
                                Resolution: {stream.res}
                                <hr></hr>
                                FPS: {stream.fps}
                                <hr></hr>
                                Coverage: {stream.cov}
                                <hr></hr>
                                Bitrate: {stream.btr}
                                <hr></hr>
                                Language: {stream.lang}
                                <hr></hr>
                                Compatibility: {stream.comp}
                                <hr></hr>
                                Ads: {stream.ads}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Watch;
