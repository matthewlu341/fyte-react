import React, { Component } from 'react'
import { Tweet } from 'react-twitter-widgets'
import '../css/Twitter.css'
import {Animated} from "react-animated-css";
import Spinner from 'react-bootstrap/Spinner'

export default class Twitter extends Component {
    constructor(props){
        super(props);
        this.state={
            tweets: [],
            loading: true
        }
        this.getTweets = this.getTweets.bind(this);
    }
    async componentWillMount(){
        let tweets = await this.getTweets();
        this.setState({tweets: tweets, loading:false})
    }

    getTweets(){
        return fetch('https://fyte-server.onrender.com/tweets', {
            method: 'get',
            headers: {'Accept': 'application/json'},
        })
        .then(response=>response.json())
        .then(tweets => {return tweets})

    }

    render() {
        return <div className="tweets">
            {this.state.loading ? <Spinner animation="border" role="status" variant='light'></Spinner> : <div></div>}
            {this.state.tweets.map((tweet) => {
                return(
                <Animated>
                    <div id='container'>
                        <Tweet options={{width: '550'}} tweetId={tweet.id_str}></Tweet>
                    </div>
                </Animated>
                )
            })}  
        </div>  
    }
}
