import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import YouTube from './YouTube.js'
import Twitter from './Twitter.js'
import Insta from './Insta.js'
import GradientButton from 'react-linear-gradient-button';
import '../css/Discover.css'
import { AiFillYoutube, AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";



export default class Discover extends Component {
    constructor(props){
        super(props);
        this.state = {
            route: 'youtube'
        }
        this.switch = this.switch.bind(this);
    }
    switch(route){
        this.setState({route: route})
    }
    render() {
        if(this.state.route === 'youtube'){
            return (
                <div>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand className='brand' href="">FYTE</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                            <Nav.Link href="" onClick={this.props.setRoute.bind(this,'watch')}>Read</Nav.Link>
                            <Nav.Link href=""c onClick={this.props.setRoute.bind(this,'bet')}>Bet</Nav.Link>
                            <Nav.Link active href="">Discover</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="buttons">
                        <GradientButton padding={12} className="btn" theme = {"YouTube"}><AiFillYoutube size='2em'></AiFillYoutube></GradientButton>
                        <GradientButton onClick = {this.switch.bind(this, 'twitter')} padding={12} className="btn" theme = {"Facebook Messenger"}><AiFillTwitterCircle size='2em'></AiFillTwitterCircle></GradientButton>
                        <GradientButton onClick = {this.switch.bind(this, 'insta')} padding={12} className="btn" theme={"Sublime Vivid"}><AiFillInstagram size='2em'></AiFillInstagram></GradientButton>
                    </div>
                    <YouTube></YouTube>
                </div>
            )
        } if (this.state.route==='twitter'){
            return(
                <div>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand className='brand' href="">FYTE</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                            <Nav.Link href="" onClick={this.props.setRoute.bind(this,'watch')}>Read</Nav.Link>
                            <Nav.Link href=""c onClick={this.props.setRoute.bind(this,'bet')}>Bet</Nav.Link>
                            <Nav.Link active href="">Discover</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="buttons">
                    <GradientButton onClick = {this.switch.bind(this, 'youtube')} padding={12} className="btn" theme = {"YouTube"}><AiFillYoutube size='2em'></AiFillYoutube></GradientButton>
                        <GradientButton padding={12} className="btn" theme = {"Facebook Messenger"}><AiFillTwitterCircle size='2em'></AiFillTwitterCircle></GradientButton>
                        <GradientButton onClick = {this.switch.bind(this, 'insta')} padding={12} className="btn" theme={"Sublime Vivid"}><AiFillInstagram size='2em'></AiFillInstagram></GradientButton>
                    </div>
                    <Twitter></Twitter>
                </div>
            )
        } else{
            return(
                <div>
                    <Navbar  bg="light" expand="lg">
                        <Navbar.Brand className='brand' href="">FYTE</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                            <Nav.Link href="" onClick={this.props.setRoute.bind(this,'watch')}>Read</Nav.Link>
                            <Nav.Link href=""c onClick={this.props.setRoute.bind(this,'bet')}>Bet</Nav.Link>
                            <Nav.Link active href="">Discover</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="buttons">
                    <GradientButton onClick = {this.switch.bind(this, 'youtube')} padding={12} className="btn" theme = {"YouTube"}><AiFillYoutube size='2em'></AiFillYoutube></GradientButton>
                        <GradientButton onClick = {this.switch.bind(this, 'twitter')} padding={12} className="btn" theme = {"Facebook Messenger"}><AiFillTwitterCircle size='2em'></AiFillTwitterCircle></GradientButton>
                        <GradientButton padding={12} className="btn" theme={"Sublime Vivid"}><AiFillInstagram size='2em'></AiFillInstagram></GradientButton>
                    </div>
                    <Insta></Insta>
                </div>
            )
        }
    }
}
