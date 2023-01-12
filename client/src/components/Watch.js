import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import '../css/Watch.css'
import Spinner from 'react-bootstrap/Spinner'
import {Animated} from "react-animated-css";
import placeholder from '../bgs/ph.jpg'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

class Watch extends Component {
    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: true,
            sortArg: 'Date'
        }
        this.getArticles = this.getArticles.bind(this);
    }

    componentWillMount(){
        this.getArticles('publishedAt')
    }

    getArticles(sortArg){
        this.setState({loading:true})
        fetch('https://fyte-server.onrender.com/news', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({sortArg: sortArg})
        })
            .then(response=>response.json())
            .then(news => {
                this.setState({articles: news.articles, loading:false, sortArg: sortArg})
            })
    }

    render() {
        return(
            <div>
                <Navbar bg="light" expand="lg">
                <Navbar.Brand className='brand' href="">FYTE</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link active href="">Read</Nav.Link>
                    <Nav.Link href="" onClick={this.props.setRoute.bind(this,'bet')}>Bet</Nav.Link>
                    <Nav.Link href="" onClick={this.props.setRoute.bind(this,'discover')} >Discover</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                <div className='dropdownContainer'>
                    <ButtonGroup aria-label="Basic example">
                        <Button onClick={this.getArticles.bind(this, 'publishedAt')} variant="success">New</Button>
                        <Button onClick={this.getArticles.bind(this, 'relevance')} variant="success">Relevant</Button>
                        <Button onClick={this.getArticles.bind(this, 'popularity')} variant="success">Popular</Button>
                    </ButtonGroup>
                </div>
                {
                this.state.loading ? <div class='spinnerContainer'><Spinner animation='grow' variant='light'></Spinner></div> : 
                this.state.articles.map(article => {
                    return(
                        <Animated>
                            <div>
                                <div id='articleContainer'>
                                    {article.urlToImage ? <img id='thumbnail' width='400px' height='auto' alt='article thumbnail' src={article.urlToImage}></img>
                                    :
                                    <img id='thumbnail' width='400px' height='auto' alt='article thumbnail' src={placeholder}></img>
                                    }
                                    <div id='textandInfo'>
                                        <div id='textContent'>
                                            <a id='link' target="_blank" rel="noopener noreferrer" href={article.url}><h2 className='article'>{article.title}</h2></a>
                                            <h5 className='desc'>{article.description}</h5>
                                        </div>
                                        <div id='articleInfo'>
                                            <h6>{article.source.name}</h6>
                                            <h6>|</h6>
                                            <h6>{new Date(article.publishedAt).toString()}</h6>
                                        </div>
                                    </div>
                                </div>
                                <hr className='articleDivider'/>
                            </div>
                        </Animated>
                    )
                })
                }
            </div>
        )
    }
}

export default Watch;
