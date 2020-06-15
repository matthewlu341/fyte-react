import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import '../css/Watch.css'
import { MdHighQuality } from "react-icons/md";
import Spinner from 'react-bootstrap/Spinner'
import {Animated} from "react-animated-css";
import { FaPlaystation } from "react-icons/fa";
import { AiFillApple, AiFillAndroid } from "react-icons/ai";

class Watch extends Component {
    constructor(props){
        super(props);
        this.state = {
            streams: [],
            loading: true
        }
        this.sortStreams = this.sortStreams.bind(this);
        this.isHD = this.isHD.bind(this);
    }

    isHD(res){
        return (res==='4K' || res==='1080p' || res==='720p')
    }

    sortStreams(arg){
        switch(arg){
            case 'ads':
                this.setState({streams:this.state.streams.sort((a,b) => (a.ads-b.ads))})
                break;
            case 'btr':
                this.setState({streams:this.state.streams.sort((a,b) => (b.btr-a.btr))})
                break;
            case 'fps':
                this.setState({streams:this.state.streams.sort((a,b) => (b.fps-a.fps))})
                break;
            case 'res':
                let temp = this.state.streams;
                for (let stream of temp){
                    if (stream.res === '4K'){
                        stream.res = '4000'
                    } else{
                        stream.res = stream.res.substring(0, stream.res.length-1)
                    }
                }
                temp = temp.sort((a,b) => (b.res-a.res))
                for (let stream of temp){
                    if (stream.res === '4000'){
                        stream.res = '4K'
                    } else{
                        stream.res = stream.res +'p'
                    }
                }
                this.setState({streams:temp})
                break;
            
            default:
                break;

        }
    }

    async componentWillMount(){
        let response = await fetch('https://fyte-server.herokuapp.com/streams');
        let streams = await response.json();
        this.setState({streams: streams, loading: false})

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
                <div className='container'>
                    <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Sort by
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item className='option' onClick={this.sortStreams.bind(this, 'res')} href="#res">Resolution</Dropdown.Item>
                                <Dropdown.Item onClick={this.sortStreams.bind(this, 'fps')} href="#fps">FPS</Dropdown.Item>
                                <Dropdown.Item onClick={this.sortStreams.bind(this, 'btr')} href="#/btr">Bitrate</Dropdown.Item>
                                <Dropdown.Item onClick={this.sortStreams.bind(this, 'ads')} href="#/ads">Ads</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    {this.state.loading ? <Spinner variant='secondary' animation="grow" /> : <div></div>}
                </div>
                <div className='streams'>
                    {
                        this.state.streams.map(stream => {
                            return <Animated animationIn='bounceIn'>
                                <Card
                                    bg={'light'}
                                    style={{ width: '18rem' }}>
                                    <Card.Header className='cardContent'><a className='streamA' rel="noopener noreferrer" target="_blank" href={stream.link}>{stream.name} </a> 
                                    {this.isHD(stream.res)? <MdHighQuality size='2em'></MdHighQuality> : <div></div>}
                                    {stream.comp.includes('iOS')? <AiFillApple ></AiFillApple> : <div></div>}
                                    {stream.comp.includes('Android')? <AiFillAndroid ></AiFillAndroid> : <div></div>}
                                    {stream.comp.includes('PS4')? <FaPlaystation ></FaPlaystation> : <div></div>}
                                    </Card.Header>
                                    <Card.Body>
                                    <Card.Text>
                                        Resolution: {stream.res}
                                        <hr></hr>
                                        FPS: {stream.fps}
                                        <hr></hr>
                                        Bitrate: {stream.btr}
                                        <hr></hr>
                                        Ads: {stream.ads}
                                        <hr></hr>
                                        Coverage: {stream.cov===''? 'None provided.' :stream.cov}
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                        </Animated>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Watch;
