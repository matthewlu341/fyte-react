import React, { Component } from 'react'
import { Tweet } from 'react-twitter-widgets'
import '../css/Twitter.css'
import {Animated} from "react-animated-css";


export default class Twitter extends Component {
    constructor(props){
        super(props);
        this.state={
            tweets: []
        }
        this.getTweets = this.getTweets.bind(this);
    }
    async componentWillMount(){
        let tweets = await this.getTweets();
        this.setState({tweets: tweets})
        console.log(this.state)
    }

    getTweets(){
        return fetch('https://fyte-server.herokuapp.com/tweets', {
            method: 'get',
            headers: {'Accept': 'application/json'},
        })
        .then(response=>response.json())
        .then(tweets => {return tweets})

    }

    render() {
        return (
            <div className="tweets">
                {this.state.tweets.map((tweet) => {
                    return(
                    <Animated animationIn="fadeInLeftBig">
                        <Tweet tweetId={tweet.id_str}></Tweet>
                    </Animated>
                    )
                })}  
            </div>
            
        )
    }
}
